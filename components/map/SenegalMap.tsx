"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { regions, extractionSites } from "@/lib/data/regions";
import { exportsByCategoryByYear } from "@/lib/data/extraction";

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-ink/40 text-sm">
      Loading map…
    </div>
  ),
});

// Mirror the bucket scheme used inside MapInner so the legend stays in sync.
const incomeBuckets = [200, 500, 800, 1200, 1800, 2400];
const incomeColors = [
  "#efe4cc",
  "#e0c89a",
  "#c89c4a",
  "#a06530",
  "#7a3520",
  "#5c1a1a",
];

const incomeForYear = (
  region: (typeof regions)[number],
  year: number,
): number => {
  if (year <= 1960) return region.perCapitaUsd1960;
  if (year >= 2020) return region.perCapitaUsd2020;
  const t = (year - 1960) / (2020 - 1960);
  return Math.round(
    region.perCapitaUsd1960 +
      (region.perCapitaUsd2020 - region.perCapitaUsd1960) * t,
  );
};

export function SenegalMap() {
  const yearOptions = useMemo(
    () => exportsByCategoryByYear.map((d) => d.year),
    [],
  );
  const minYear = yearOptions[0] ?? 1960;
  const maxYear = yearOptions[yearOptions.length - 1] ?? 2024;
  const [year, setYear] = useState<number>(Math.min(2020, maxYear));
  const [selectedRegion, setSelectedRegion] = useState<string | null>("Dakar");

  if (regions.length === 0) {
    return (
      <div className="border border-ink/15 bg-parchment/60 p-6 text-sm text-ink/70">
        Map data is not yet populated.
      </div>
    );
  }

  const region = regions.find((r) => r.name === selectedRegion) ?? regions[0];
  const visibleSites = extractionSites.filter((s) => s.startedYear <= year);

  return (
    <div className="space-y-4">
      {/* Year slider */}
      <div className="border border-ink/15 bg-parchment/60 p-4">
        <div className="flex items-baseline justify-between mb-3">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/70">
            Year
          </label>
          <span className="font-serif text-3xl text-ink">{year}</span>
        </div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          step={1}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full accent-rust"
        />
        <div className="flex justify-between text-xs text-ink/50 mt-1">
          <span>{minYear}</span>
          <span className="text-rust">| 1960 independence</span>
          <span>{maxYear}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {yearOptions.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`text-xs px-2 py-1 border transition ${
                y === year
                  ? "bg-ink text-parchment border-ink"
                  : "border-ink/30 text-ink/70 hover:border-ink"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        {/* Map */}
        <div className="relative h-[560px] border border-ink/15 overflow-hidden">
          <MapInner
            year={year}
            visibleSites={visibleSites}
            onSelectRegion={setSelectedRegion}
            selectedRegion={selectedRegion}
          />
        </div>

        {/* Region info panel */}
        <aside className="border border-ink/15 bg-parchment/60 p-5 space-y-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60">
              Selected region
            </div>
            <h4 className="font-serif text-3xl text-ink">{region.name}</h4>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60">
              Per-capita income, {year}
            </div>
            <div className="font-serif text-4xl text-rust">
              ${incomeForYear(region, year).toLocaleString()}
            </div>
            <div className="text-xs text-ink/50 mt-1">
              1960: ${region.perCapitaUsd1960.toLocaleString()} · 2020: $
              {region.perCapitaUsd2020.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-1">
              Notes
            </div>
            <p className="text-sm text-ink/80 leading-relaxed">{region.notes}</p>
          </div>

          <div className="pt-3 border-t border-ink/15">
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-2">
              Active extraction sites ({visibleSites.length})
            </div>
            <ul className="text-xs space-y-1.5 max-h-44 overflow-y-auto pr-2">
              {visibleSites.map((s) => (
                <li key={s.name} className="text-ink/75">
                  <span className="font-medium text-ink">{s.name}</span>
                  <br />
                  <span className="text-ink/55">
                    {s.resource} · {s.operator} · est. {s.startedYear}
                  </span>
                </li>
              ))}
              {visibleSites.length === 0 && (
                <li className="text-ink/50 italic">
                  No industrial sites recorded for {year}.
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      {/* Legend */}
      <div className="border border-ink/15 bg-parchment/60 p-4 space-y-3">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-2">
            Per-capita income (USD/yr)
          </div>
          <div className="flex items-stretch gap-0 text-xs">
            {incomeColors.map((c, i) => {
              const lo = i === 0 ? 0 : incomeBuckets[i - 1];
              const hi = incomeBuckets[i];
              return (
                <div key={c} className="flex-1 flex flex-col items-stretch">
                  <div
                    className="h-5 border border-ink/15"
                    style={{ background: c }}
                  />
                  <div className="text-center text-ink/60 mt-1">
                    {hi
                      ? `$${lo.toLocaleString()}–${hi.toLocaleString()}`
                      : `$${lo.toLocaleString()}+`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-xs text-ink/60 flex flex-wrap gap-4 pt-2 border-t border-ink/10">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-ink border-2 border-parchment ring-1 ring-ink/40" />
            industrial mine
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full border-2 border-parchment ring-1 ring-ink/40"
              style={{ background: "#3d5a4a" }}
            />
            offshore (oil/gas/fishing)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-sage border-2 border-parchment ring-1 ring-ink/40" />
            artisanal
          </span>
          <span className="ml-auto italic text-ink/50">
            Click a region to see details · drag to pan · scroll to zoom
          </span>
        </div>
      </div>
    </div>
  );
}
