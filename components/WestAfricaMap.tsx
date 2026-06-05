"use client";

import { useState } from "react";
import {
  mapEras,
  mapFootnote,
  peerCountryColors,
  peerCountryLabels,
  peerCountryOrder,
  type MapRegion,
} from "@/lib/data/westAfricaMap";
import { useTabListKeyboard } from "@/lib/useTabListKeyboard";

function RegionShape({
  region,
  highlighted,
  onHover,
}: {
  region: MapRegion;
  highlighted: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <path
      d={region.path}
      fill={region.fill}
      fillOpacity={
        region.fillOpacity ?? (region.fill === "transparent" ? 0 : 0.9)
      }
      stroke={region.stroke ?? (highlighted ? "#1a1814" : "#1a181440")}
      strokeWidth={region.strokeWidth ?? (highlighted ? 2.5 : 1)}
      strokeDasharray={region.strokeDasharray}
      className="transition-[stroke-width] duration-100 cursor-default"
      onMouseEnter={() => onHover(region.id)}
      onMouseLeave={() => onHover(null)}
      aria-label={region.label}
    >
      <title>{region.label}</title>
    </path>
  );
}

export function WestAfricaMap() {
  const [eraId, setEraId] = useState("today");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const eraIndex = mapEras.findIndex((e) => e.id === eraId);
  const era = mapEras[eraIndex] ?? mapEras[mapEras.length - 1]!;
  const onTabKeyDown = useTabListKeyboard(mapEras.length, eraIndex, (i) =>
    setEraId(mapEras[i]!.id),
  );

  const hoveredRegion = era.regions.find((r) => r.id === hoveredId);

  return (
    <figure
      id="map"
      className="border border-ink/15 bg-parchment/40 p-5 md:p-6 space-y-4"
    >
      <figcaption className="space-y-2 max-w-3xl">
        <h3 className="font-serif text-2xl md:text-3xl text-ink">
          West Africa — borders over time
        </h3>
        <p className="text-sm text-ink/70 leading-relaxed">
          The seven peer states in this project, shown across four eras. Toggle
          the year to see pre-colonial polities, colonial partition,
          independence, and today&apos;s borders. Hover a region for its label.
        </p>
      </figcaption>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Map era"
        onKeyDown={onTabKeyDown}
      >
        {mapEras.map((e) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={eraId === e.id}
            tabIndex={eraId === e.id ? 0 : -1}
            onClick={() => {
              setEraId(e.id);
              setHoveredId(null);
            }}
            className={`text-xs px-3 py-2 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
              eraId === e.id
                ? "bg-ink text-parchment border-ink"
                : "border-ink/30 text-ink/70 hover:border-ink"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_200px] gap-4 items-start">
        <div className="border border-ink/10 bg-[#ede5d3] p-2 md:p-4">
          <svg
            viewBox="0 0 480 520"
            className="w-full h-auto max-h-[420px]"
            role="img"
            aria-label={`Schematic map of West Africa peer countries, ${era.title}`}
          >
            <rect width="480" height="520" fill="#ede5d3" />
            <text
              x="18"
              y="508"
              fill="#1a181480"
              style={{ fontSize: 9, fontFamily: "var(--font-sans), sans-serif" }}
            >
              Atlantic ←
            </text>
            {era.regions.map((region) => (
              <RegionShape
                key={region.id}
                region={region}
                highlighted={hoveredId === region.id}
                onHover={setHoveredId}
              />
            ))}
          </svg>
        </div>

        <aside className="space-y-4 text-sm">
          <div className="border border-ink/10 bg-parchment/60 p-4 space-y-2 min-h-[120px]">
            <div className="text-xs uppercase tracking-[0.15em] text-rust">
              {era.year}
            </div>
            <div className="font-serif text-lg text-ink">{era.title}</div>
            <p className="text-ink/70 text-xs leading-relaxed">
              {era.description}
            </p>
            {hoveredRegion ? (
              <p className="text-ink text-xs border-t border-ink/10 pt-2">
                <span className="uppercase tracking-[0.12em] text-rust text-[0.65rem] block mb-0.5">
                  Region
                </span>
                {hoveredRegion.label}
              </p>
            ) : (
              <p className="text-ink/45 text-xs italic border-t border-ink/10 pt-2">
                Hover a region on the map
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.15em] text-ink/50">
              Peer set
            </div>
            <ul className="space-y-1">
              {peerCountryOrder.map((id) => (
                <li key={id} className="flex items-center gap-2 text-xs text-ink/75">
                  <span
                    className="inline-block w-3 h-3 shrink-0 border border-ink/20"
                    style={{ backgroundColor: peerCountryColors[id] }}
                    aria-hidden
                  />
                  {peerCountryLabels[id]}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <p className="text-xs text-ink/55 max-w-3xl">{mapFootnote}</p>
    </figure>
  );
}
