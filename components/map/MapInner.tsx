"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip as LeafletTooltip,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import type { Feature, FeatureCollection } from "geojson";
import { regions, type ExtractionSite } from "@/lib/data/regions";

type Props = {
  year: number;
  visibleSites: ExtractionSite[];
  onSelectRegion: (name: string) => void;
  selectedRegion: string | null;
};

// GeoJSON shapeName → our region name (handles diacritics + spacing).
const nameMap: Record<string, string> = {
  Dakar: "Dakar",
  Diourbel: "Diourbel",
  Fatick: "Fatick",
  Kaffrine: "Kaffrine",
  Kaolack: "Kaolack",
  Kolda: "Kolda",
  Louga: "Louga",
  Matam: "Matam",
  "Saint Louis": "Saint-Louis",
  Sedhiou: "Sédhiou",
  Tambacounda: "Tambacounda",
  Thies: "Thiès",
  Ziguinchor: "Ziguinchor",
  Kedougou: "Kédougou",
};

// Income-by-year interpolation, mirroring the panel.
const incomeForYear = (regionName: string, year: number): number => {
  const r = regions.find((x) => x.name === regionName);
  if (!r) return 0;
  if (year <= 1960) return r.perCapitaUsd1960;
  if (year >= 2020) return r.perCapitaUsd2020;
  const t = (year - 1960) / (2020 - 1960);
  return Math.round(
    r.perCapitaUsd1960 + (r.perCapitaUsd2020 - r.perCapitaUsd1960) * t,
  );
};

// Color scale (parchment → ochre → rust → oxblood) keyed to income.
// Domain dynamically based on max income across all years (Dakar 2020 = 2750).
const incomeBuckets = [200, 500, 800, 1200, 1800, 2400];
const incomeColors = [
  "#efe4cc",
  "#e0c89a",
  "#c89c4a",
  "#a06530",
  "#7a3520",
  "#5c1a1a",
];

const colorForIncome = (income: number): string => {
  for (let i = 0; i < incomeBuckets.length; i++) {
    if (income < incomeBuckets[i]) return incomeColors[i];
  }
  return incomeColors[incomeColors.length - 1];
};

const siteColor = (scale: ExtractionSite["scale"]): string => {
  switch (scale) {
    case "industrial":
      return "#1a1814";
    case "offshore":
      return "#3d5a4a";
    case "artisanal":
      return "#6a7d5e";
  }
};

const siteIcon = (scale: ExtractionSite["scale"]) =>
  L.divIcon({
    className: "",
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    html: `<div style="
      width:10px;height:10px;border-radius:50%;
      background:${siteColor(scale)};
      border:2px solid #f5f1e8;
      box-shadow:0 0 0 1px rgba(0,0,0,0.6);
    "></div>`,
  });

export default function MapInner({
  year,
  visibleSites,
  onSelectRegion,
  selectedRegion,
}: Props) {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/senegal-regions.geojson")
      .then((r) => r.json())
      .then(setGeo)
      .catch(() => setGeo(null));
  }, []);

  const styleFn = useMemo(
    () => (feature?: Feature) => {
      if (!feature) return {};
      const shapeName = (feature.properties as { shapeName: string })?.shapeName;
      const regionName = nameMap[shapeName] ?? shapeName;
      const income = incomeForYear(regionName, year);
      const isSelected = regionName === selectedRegion;
      return {
        fillColor: colorForIncome(income),
        weight: isSelected ? 2.5 : 0.6,
        color: isSelected ? "#1a1814" : "#1a1814",
        fillOpacity: isSelected ? 0.95 : 0.85,
      };
    },
    [year, selectedRegion],
  );

  return (
    <MapContainer
      center={[14.4, -14.7]}
      zoom={7}
      minZoom={6}
      maxZoom={10}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", background: "#ede5d3" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        opacity={0.55}
      />

      {geo && (
        <GeoJSON
          key={`${year}-${selectedRegion}`}
          data={geo}
          style={styleFn}
          onEachFeature={(feature, layer) => {
            const shapeName = (feature.properties as { shapeName: string })?.shapeName;
            const regionName = nameMap[shapeName] ?? shapeName;
            const income = incomeForYear(regionName, year);
            layer.bindTooltip(
              `<div style="font-family:Inter,sans-serif;font-size:12px;line-height:1.4">
                <strong>${regionName}</strong><br/>
                $${income.toLocaleString()} / yr (${year})
              </div>`,
              { sticky: true },
            );
            layer.on({
              click: () => onSelectRegion(regionName),
              mouseover: (e) => {
                const l = e.target as L.Path;
                l.setStyle({ weight: 2, fillOpacity: 0.95 });
              },
              mouseout: (e) => {
                const l = e.target as L.Path;
                if (regionName !== selectedRegion) {
                  l.setStyle({ weight: 0.6, fillOpacity: 0.85 });
                }
              },
            });
          }}
        />
      )}

      <TileLayer
        attribution=""
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        opacity={0.85}
      />

      {visibleSites.map((s) => (
        <Marker key={s.name} position={[s.lat, s.lng]} icon={siteIcon(s.scale)}>
          <LeafletTooltip direction="top" offset={[0, -6]}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5 }}>
              <strong>{s.name}</strong>
              <br />
              {s.resource} · {s.scale}
              <br />
              <span style={{ color: "#666" }}>
                {s.operator} · est. {s.startedYear}
              </span>
            </div>
          </LeafletTooltip>
          <Popup>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12 }}>
              <strong>{s.name}</strong>
              <br />
              {s.resource} · {s.scale}
              <br />
              <span style={{ color: "#666" }}>
                {s.operator} · est. {s.startedYear}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
