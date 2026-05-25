#!/usr/bin/env python3
"""
Generate static TS data for charts from public datasets.

Outputs:
- lib/data/government.ts
"""

from __future__ import annotations

import csv
import io
import json
import sys
import textwrap
import urllib.request
from dataclasses import dataclass
from typing import Any, Dict, Iterable, List, Optional, Tuple


def http_get(url: str) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (generate_graph_data.py)",
            "Accept": "*/*",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def world_bank_series(country: str, indicator: str) -> Dict[int, float]:
    """
    Fetch World Bank indicator series.
    Returns {year: value} for non-null values.
    """
    url = (
        f"https://api.worldbank.org/v2/country/{country}/indicator/{indicator}"
        "?format=json&per_page=20000"
    )
    raw = http_get(url)
    payload = json.loads(raw.decode("utf-8"))
    if not isinstance(payload, list) or len(payload) < 2:
        raise RuntimeError(f"Unexpected World Bank response for {indicator}")
    rows = payload[1]
    out: Dict[int, float] = {}
    for r in rows:
        year = int(r["date"])
        val = r["value"]
        if val is None:
            continue
        out[year] = float(val)
    return out


def owid_grapher_series(slug: str, entity: str) -> Dict[int, float]:
    """
    Fetch OWID grapher CSV series (single country).
    Returns {year: value}.
    """
    url = f"https://ourworldindata.org/grapher/{slug}.csv?country={urllib.parse.quote(entity)}"
    raw = http_get(url)
    text = raw.decode("utf-8")
    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames:
        return {}
    value_fields = [
        f
        for f in reader.fieldnames
        if f
        and f
        not in (
            "Entity",
            "Code",
            "Year",
            "World region according to OWID",
        )
    ]
    if not value_fields:
        return {}
    value_field = value_fields[0]
    out: Dict[int, float] = {}
    for row in reader:
        if row.get("Entity") != entity:
            continue
        year = int(row["Year"])
        val = row.get(value_field)
        if val is None or val == "":
            continue
        out[year] = float(val)
    return out


def owid_grapher_binary_years(slug: str, country_name: str) -> List[int]:
    """
    For OWID grapher datasets that are 0/1 per year.
    Returns years where value == 1.
    """
    series = owid_grapher_series(slug, country_name)
    return sorted([y for y, v in series.items() if v >= 0.5])


def parse_cam_coups(csv_bytes: bytes) -> List[Dict[str, str]]:
    text = csv_bytes.decode("utf-8", errors="replace")
    reader = csv.DictReader(io.StringIO(text))
    return [dict(r) for r in reader]


def cam_successful_coups_since(rows: List[Dict[str, str]], country: str, since_year: int) -> int:
    # CAM uses Country name in 'country' or 'Country' depending on file version.
    key_country = "country" if "country" in rows[0] else "Country"
    key_year = "year" if "year" in rows[0] else "Year"
    key_success = "successful" if "successful" in rows[0] else "Successful"

    n = 0
    for r in rows:
        if r.get(key_country, "").strip().lower() != country.lower():
            continue
        try:
            y = int(float(r.get(key_year, "") or 0))
        except ValueError:
            continue
        if y < since_year:
            continue
        s = (r.get(key_success, "") or "").strip()
        if s in ("1", "true", "TRUE", "Yes", "YES"):
            n += 1
    return n


def fmt_ts(obj: Any, indent: int = 2) -> str:
    # simple JSON-ish formatter for TS literals
    return json.dumps(obj, ensure_ascii=False, indent=indent).replace('"', '"')


def write_file(path: str, content: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def main() -> None:
    # --- Government: V-Dem LDI via OWID grapher ---
    vdem = owid_grapher_series("liberal-democracy-index", "Senegal")
    vdem_points = [{"year": y, "vdem": vdem[y]} for y in sorted(vdem.keys())]

    # --- Coups: CAM dataset ---
    cam_csv = http_get("https://militarycoups.org/cam_list_current.csv")
    cam_rows = parse_cam_coups(cam_csv)

    countries = ["Senegal", "Mali", "Guinea", "Guinea-Bissau", "Mauritania", "The Gambia", "Burkina Faso"]
    coups = {c: cam_successful_coups_since(cam_rows, c, 1960) for c in countries}

    # --- Armed conflict: OWID binary 1989-2024 (UCDP GED based) ---
    # Dataset is 0/1 per year per country.
    war_years = {c: owid_grapher_binary_years("locations-of-ongoing-armed-conflicts", c) for c in countries}
    war_counts = {c: len(war_years[c]) for c in countries}

    regional_comparison = [
        {"country": c, "coups": coups[c], "yearsOfWar": war_counts[c]} for c in countries
    ]

    # Regime list (for leader cards)
    senegal_regimes = [
        {
            "type": "colonial",
            "leader": "French West Africa (AOF)",
            "start": 1895,
            "end": 1958,
            "note": "Senegal as administrative center of the federation; indigénat, assimilationist law, and extractive political economy under Paris.",
        },
        {
            "type": "colonial",
            "leader": "Mali Federation (with French Sudan)",
            "start": 1959,
            "end": 1960,
            "note": "Brief federal experiment; collapse over federal power-sharing foreshadows Senegal's insistence on a unitary, Dakar-centered state.",
        },
        {
            "type": "postcolonial",
            "leader": "Léopold Sédar Senghor",
            "start": 1960,
            "end": 1980,
            "note": "First president; oversaw one-party dominance and a gradual, managed liberalization before resigning in 1980.",
        },
        {
            "type": "postcolonial",
            "leader": "Abdou Diouf",
            "start": 1981,
            "end": 2000,
            "note": "Presided over economic adjustment and multipartism; lost power in the 2000 election (Senegal’s first alternation).",
        },
        {
            "type": "postcolonial",
            "leader": "Abdoulaye Wade",
            "start": 2000,
            "end": 2012,
            "note": "Second president; major infrastructure push and political volatility; defeated in 2012 after a contested third-term bid.",
        },
        {
            "type": "postcolonial",
            "leader": "Macky Sall",
            "start": 2012,
            "end": 2024,
            "note": "Oversaw growth and major oil & gas investments; later years marked by rising polarization and civic unrest.",
        },
        {
            "type": "postcolonial",
            "leader": "Bassirou Diomaye Faye",
            "start": 2024,
            "end": "present",
            "note": "Elected in 2024 on an anti-corruption, reform platform; governs alongside PM Ousmane Sonko.",
        },
    ]

    governance_hypotheses = [
        {
            "title": "Colonial state-building",
            "body": "Senegal had a longer, more centralized French administration than many neighbors — and Dakar was the capital of French West Africa. The bureaucracy, courts, and party system did not have to be invented at independence.",
        },
        {
            "title": "Elite continuity & managed pluralism",
            "body": "Senghor and Diouf ruled through parties and elections rather than pure military dictatorship. Opposition was often co-opted or constrained, but violent regime change was rare — lowering coup incentives compared to Mali or Guinea.",
        },
        {
            "title": "Sufi brotherhoods",
            "body": "The Mourides, Tijaniyya, and other orders mediate between state and society. Scholars argue they channel dissent and discourage radical alternatives — a social structure less present in more fractured polities.",
        },
        {
            "title": "Relative ethnic cohesion",
            "body": "Wolof plurality is large but not overwhelming; Senegal lacks the sharp ethnic arithmetic of some neighbors. Casamance is the main exception — and that is where most armed conflict has been concentrated.",
        },
        {
            "title": "French security & Françafrique",
            "body": "Continued French military presence, aid, and informal influence may have discouraged putsches and rewarded cooperative leaders. The same ties are criticized as limiting true sovereignty.",
        },
    ]

    conflicts = [
        {
            "year": 1982,
            "name": "Casamance conflict begins",
            "note": "Low-intensity separatist insurgency in southern Senegal; episodic fighting and negotiations over decades.",
            "body": "UCDP classifies Senegal’s organized violence primarily through the Casamance insurgency, with peaks in the 1990s–2000s.",
            "intensity": "medium",
        },
        {
            "year": 1989,
            "name": "Senegal–Mauritania border crisis",
            "note": "Violent unrest and expulsions following clashes along the Senegal River valley.",
            "body": "The crisis triggered diplomatic rupture and significant displacement before relations normalized in the 1990s.",
            "intensity": "medium",
        },
        {
            "year": 2021,
            "name": "Political unrest (Dakar and other cities)",
            "note": "Episodes of street protests and violence amid political tensions.",
            "body": "These events are distinct from civil war dynamics but still reflect real spikes in unrest and repression.",
            "intensity": "low",
        },
    ]

    government_ts = f"""\
export type SenegalRegime = {{
  type: "postcolonial" | "colonial";
  leader: string;
  start: number;
  end: number | "present";
  note: string;
}};

export type VDemPoint = {{ year: number; vdem: number }};

// V-Dem Liberal Democracy Index (0–1), processed by Our World in Data.
// Source: https://ourworldindata.org/grapher/liberal-democracy-index
export const vdemLibDemSenegal: VDemPoint[] = {fmt_ts(vdem_points, indent=2)};

export const senegalRegimes: SenegalRegime[] = {fmt_ts(senegal_regimes, indent=2)};

export const regionalComparison: {{ country: string; coups: number; yearsOfWar: number }}[] =
  {fmt_ts(regional_comparison, indent=2)};

export const governanceHypotheses: {{ title: string; body: string }}[] =
  {fmt_ts(governance_hypotheses, indent=2)};

export const conflicts: {{
  year: number;
  name: string;
  note: string;
  body: string;
  intensity: "low" | "medium" | "high";
}}[] = {fmt_ts(conflicts, indent=2)};
"""

    write_file("lib/data/government.ts", government_ts)

    print("Wrote lib/data/government.ts")


if __name__ == "__main__":
    main()

