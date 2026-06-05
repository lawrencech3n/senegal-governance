"use client";

import { useMemo, useState } from "react";
import { geoGraticule, geoMercator, geoPath } from "d3-geo";
import peerFeatures from "@/lib/data/westAfricaPeers.json";
import {
  mapEras,
  mapFootnote,
  numericToPeer,
  peerCountryColors,
  peerCountryLabels,
  peerCountryOrder,
  styleForRegion,
  type PeerFeatureCollection,
} from "@/lib/data/westAfricaMap";
import { useTabListKeyboard } from "@/lib/useTabListKeyboard";

const collection = peerFeatures as PeerFeatureCollection;

const SVG_WIDTH = 640;
const SVG_HEIGHT = 520;
const PAD: [[number, number], [number, number]] = [
  [20, 16],
  [620, 500],
];

export function WestAfricaMap() {
  const [eraId, setEraId] = useState("today");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { peerFeatures, contextFeatures } = useMemo(() => {
    const peers = collection.features.filter((f) => f.properties.layer === "peer");
    const context = collection.features.filter(
      (f) => f.properties.layer === "context",
    );
    return { peerFeatures: peers, contextFeatures: context };
  }, []);

  const fitCollection = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: peerFeatures,
    }),
    [peerFeatures],
  );

  const pathGenerator = useMemo(() => {
    const projection = geoMercator().fitExtent(PAD, fitCollection);
    return geoPath(projection);
  }, [fitCollection]);

  const graticulePath = useMemo(
    () => pathGenerator(geoGraticule().step([4, 4])()) ?? "",
    [pathGenerator],
  );

  const eraIndex = mapEras.findIndex((e) => e.id === eraId);
  const era = mapEras[eraIndex] ?? mapEras[mapEras.length - 1]!;
  const onTabKeyDown = useTabListKeyboard(mapEras.length, eraIndex, (i) => {
    setEraId(mapEras[i]!.id);
    setHoveredId(null);
  });

  const hoveredFeature = peerFeatures.find((f) => String(f.id) === hoveredId);
  const hoveredLabel = hoveredFeature
    ? styleForRegion(eraId, String(hoveredFeature.id)).label
    : null;

  return (
    <figure
      id="map"
      className="border border-ink/15 bg-parchment/40 p-5 md:p-6 space-y-4"
    >
      <figcaption className="space-y-2 max-w-3xl">
        <h3 className="font-serif text-2xl md:text-3xl text-ink">
          West Africa — where the comparison lives
        </h3>
        <p className="text-sm text-ink/70 leading-relaxed">
          The seven peer states on real coastlines and borders (Natural Earth).
          Toggle the era to see colonial partition, then compare to the charts
          below. Neighboring countries are shown in outline for context only.
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
        <div className="border border-ink/10 bg-[#b8c9d9] p-1 md:p-2 rounded-sm overflow-hidden">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-auto"
            role="img"
            aria-label={`Map of West Africa peer countries, ${era.title}`}
          >
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#b8c9d9" />
            {graticulePath && (
              <path
                d={graticulePath}
                fill="none"
                stroke="#1a181412"
                strokeWidth={0.5}
                pointerEvents="none"
              />
            )}
            {contextFeatures.map((feature) => {
              const d = pathGenerator(feature);
              if (!d) return null;
              return (
                <path
                  key={`ctx-${feature.id}`}
                  d={d}
                  fill="#e8e0d4"
                  fillOpacity={0.85}
                  stroke="#1a181418"
                  strokeWidth={0.5}
                  pointerEvents="none"
                />
              );
            })}
            {peerFeatures.map((feature) => {
              const numericId = String(feature.id);
              const d = pathGenerator(feature);
              if (!d) return null;
              const style = styleForRegion(eraId, numericId);
              const highlighted = hoveredId === numericId;
              const isSenegal = numericToPeer[numericId] === "senegal";
              return (
                <path
                  key={numericId}
                  d={d}
                  fill={style.fill}
                  fillOpacity={style.fillOpacity}
                  stroke={highlighted ? "#1a1814" : style.stroke}
                  strokeWidth={
                    highlighted ? 2.5 : isSenegal ? 1.75 : style.strokeWidth
                  }
                  strokeDasharray={style.strokeDasharray}
                  className="transition-[stroke-width,fill-opacity] duration-75 cursor-default"
                  onMouseEnter={() => setHoveredId(numericId)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={style.label}
                >
                  <title>{style.label}</title>
                </path>
              );
            })}
            <text
              x={16}
              y={SVG_HEIGHT - 12}
              fill="#1a181460"
              style={{ fontSize: 9, fontFamily: "var(--font-sans), sans-serif" }}
            >
              Atlantic ← · Natural Earth 110m
            </text>
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
            {hoveredLabel ? (
              <p className="text-ink text-xs border-t border-ink/10 pt-2">
                <span className="uppercase tracking-[0.12em] text-rust text-[0.65rem] block mb-0.5">
                  Country
                </span>
                {hoveredLabel}
              </p>
            ) : (
              <p className="text-ink/45 text-xs italic border-t border-ink/10 pt-2">
                Hover a peer country on the map
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
