#!/usr/bin/env python3
"""
Generate static TS data for charts from public datasets.

Outputs:
- lib/data/government.ts
- lib/data/extraction.ts
- lib/data/environment.ts
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

export const conflicts: {{
  year: number;
  name: string;
  note: string;
  body: string;
  intensity: "low" | "medium" | "high";
}}[] = {fmt_ts(conflicts, indent=2)};
"""

    # --- Extraction: World Bank export composition ---
    # Total merchandise exports (current US$)
    total = world_bank_series("SEN", "TX.VAL.MRCH.CD.WT")
    shares = {
        "fuel": world_bank_series("SEN", "TX.VAL.FUEL.ZS.UN"),
        "oresMetals": world_bank_series("SEN", "TX.VAL.MMTL.ZS.UN"),
        "food": world_bank_series("SEN", "TX.VAL.FOOD.ZS.UN"),
        "agriRaw": world_bank_series("SEN", "TX.VAL.AGRI.ZS.UN"),
    }

    years = sorted(set(total.keys()) & set(shares["fuel"].keys()) & set(shares["oresMetals"].keys()) & set(shares["food"].keys()) & set(shares["agriRaw"].keys()))
    exports_by_year = []
    for y in years:
        t = total[y]
        def val(pct: float) -> float:
            return (t * pct / 100.0) / 1_000_000.0  # USD -> USD millions
        exports_by_year.append(
            {
                "year": y,
                "totalUsdM": round(t / 1_000_000.0, 2),
                "fuelUsdM": round(val(shares["fuel"][y]), 2),
                "oresMetalsUsdM": round(val(shares["oresMetals"][y]), 2),
                "foodUsdM": round(val(shares["food"][y]), 2),
                "agriRawUsdM": round(val(shares["agriRaw"][y]), 2),
            }
        )

    # 2020 composition (fallback to nearest year if missing)
    comp_year = 2020 if 2020 in total else years[-1]
    t = total[comp_year]
    comp_2020 = [
        {"category": "Fuel", "usdM": round((t * shares["fuel"][comp_year] / 100.0) / 1_000_000.0, 2)},
        {"category": "Ores & metals", "usdM": round((t * shares["oresMetals"][comp_year] / 100.0) / 1_000_000.0, 2)},
        {"category": "Food", "usdM": round((t * shares["food"][comp_year] / 100.0) / 1_000_000.0, 2)},
        {"category": "Agricultural raw materials", "usdM": round((t * shares["agriRaw"][comp_year] / 100.0) / 1_000_000.0, 2)},
    ]

    extraction_ts = f"""\
export type ExportCategoryPoint = {{
  year: number;
  totalUsdM: number;
  fuelUsdM: number;
  oresMetalsUsdM: number;
  foodUsdM: number;
  agriRawUsdM: number;
}};

// World Bank merchandise exports (current US$) and composition shares.
// Total: TX.VAL.MRCH.CD.WT
// Shares: TX.VAL.FUEL.ZS.UN, TX.VAL.MMTL.ZS.UN, TX.VAL.FOOD.ZS.UN, TX.VAL.AGRI.ZS.UN
// API: https://api.worldbank.org/
export const exportsByCategoryByYear: ExportCategoryPoint[] = {fmt_ts(exports_by_year, indent=2)};

export const exportComposition2020: {{ category: string; usdM: number }}[] = {fmt_ts(comp_2020, indent=2)};

export const majorOperators: {{
  name: string;
  origin: string;
  resource: string;
  era: string;
  notes: string;
}}[] = [
  {{
    name: "Industries Chimiques du Sénégal (ICS)",
    origin: "Senegal / multinational ownership",
    resource: "Phosphates & fertilizer",
    era: "Postcolonial",
    notes: "One of Senegal’s largest industrial groups; operates phosphate mining and fertilizer production around Taïba and Darou.",
  }},
  {{
    name: "Sabodala-Massawa (Endeavour Mining)",
    origin: "Canada/UK-listed",
    resource: "Gold",
    era: "Postcolonial",
    notes: "Large-scale gold mining in southeastern Senegal; among the country’s most significant modern extractive projects.",
  }},
];
"""

    # --- Environment: forest, fish capture (World Bank / FAO) ---
    forest = world_bank_series("SEN", "AG.LND.FRST.ZS")  # % land area
    fish = world_bank_series("SEN", "ER.FSH.CAPT.MT")  # metric tons

    # Build combined env series on shared year domain (1990+)
    env_years = sorted(set(forest.keys()) & set(fish.keys()))
    # keep a reasonably sized set for the UI (annual is fine but can be long)
    env_years = [y for y in env_years if 1990 <= y <= 2024]
    env = []
    for y in env_years:
        env.append(
            {
                "year": y,
                "forestCoverPct": round(forest[y], 2),
                "fishCaptureMt": round(fish[y], 0),
            }
        )

    environment_ts = f"""\
export type EnvIndicator = {{
  year: number;
  forestCoverPct: number; // % of land area (World Bank / FAO)
  fishCaptureMt: number; // metric tons (World Bank / FAO)
}};

// Forest area (% of land area): AG.LND.FRST.ZS
// Fish capture production (metric tons): ER.FSH.CAPT.MT
// World Bank API: https://api.worldbank.org/
export const envIndicators: EnvIndicator[] = {fmt_ts(env, indent=2)};

export const environmentalImpacts: {{
  driver: string;
  title: string;
  body: string;
}}[] = [
  {{
    driver: "Deforestation & fuelwood",
    title: "Forest loss and fragmentation",
    body: "Forest cover has declined steadily since 1990, reflecting agricultural expansion, charcoal production, and land pressure around growing cities.",
  }},
  {{
    driver: "Coastal change",
    title: "Mangroves under stress",
    body: "Mangroves have faced long-term pressure from salinization, coastal erosion, and local wood harvesting; restoration projects can be locally significant even when national-level indicators move slowly.",
  }},
  {{
    driver: "Fisheries",
    title: "Rising pressure on fish stocks",
    body: "Senegal’s coastal fisheries are heavily exploited; industrial and artisanal effort combined with foreign access agreements has raised sustainability concerns.",
  }},
];
"""

    # --- write outputs ---
    write_file("lib/data/government.ts", government_ts)
    write_file("lib/data/extraction.ts", extraction_ts)
    write_file("lib/data/environment.ts", environment_ts)

    print("Wrote lib/data/government.ts, lib/data/extraction.ts, lib/data/environment.ts")


if __name__ == "__main__":
    main()

