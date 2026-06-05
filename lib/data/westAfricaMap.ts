import type { Feature, FeatureCollection, Geometry } from "geojson";

export type PeerCountryId =
  | "senegal"
  | "mali"
  | "guinea"
  | "guinea-bissau"
  | "mauritania"
  | "gambia"
  | "burkina-faso";

/** ISO 3166-1 numeric codes (Natural Earth / world-atlas). */
export const numericToPeer: Record<string, PeerCountryId> = {
  "686": "senegal",
  "466": "mali",
  "324": "guinea",
  "624": "guinea-bissau",
  "478": "mauritania",
  "270": "gambia",
  "854": "burkina-faso",
};

/** Francophone AOF territories within the peer set (1930 era). */
export const aofNumericIds = new Set(["686", "466", "324", "478", "854"]);

export const peerCountryLabels: Record<PeerCountryId, string> = {
  senegal: "Senegal",
  mali: "Mali",
  guinea: "Guinea",
  "guinea-bissau": "Guinea-Bissau",
  mauritania: "Mauritania",
  gambia: "The Gambia",
  "burkina-faso": "Burkina Faso",
};

export const peerCountryColors: Record<PeerCountryId, string> = {
  senegal: "#5c1a1a",
  mali: "#a04525",
  guinea: "#6a7d5e",
  "guinea-bissau": "#c89c4a",
  mauritania: "#4a4540",
  gambia: "#8b6914",
  "burkina-faso": "#7a5c3e",
};

export const peerCountryOrder: PeerCountryId[] = [
  "senegal",
  "mali",
  "guinea",
  "guinea-bissau",
  "mauritania",
  "gambia",
  "burkina-faso",
];

export type MapEra = {
  id: string;
  label: string;
  year: string;
  title: string;
  description: string;
};

export const mapEras: MapEra[] = [
  {
    id: "1850",
    label: "c. 1850",
    year: "Pre-colonial",
    title: "Polities before fixed borders",
    description:
      "Modern coastlines shown for reference only. Wolof states, Futa Toro, Kaabu, Futa Jallon, Mossi kingdoms, and emirates overlapped — borders were fluid, not today’s lines.",
  },
  {
    id: "1930",
    label: "1930",
    year: "Colonial",
    title: "Partition under empire",
    description:
      "French West Africa (AOF) unified most Francophone peers under Dakar. British Gambia and Portuguese Guinea-Bissau remained separate jurisdictions.",
  },
  {
    id: "1960",
    label: "1960",
    year: "Independence",
    title: "Flags change, lines mostly hold",
    description:
      "Independence for most peers. Upper Volta (Burkina Faso), Mali, Senegal, Guinea, and Mauritania as separate republics; The Gambia (1965) and Guinea-Bissau (1974) on different timetables.",
  },
  {
    id: "today",
    label: "Today",
    year: "Present",
    title: "Current peer set",
    description:
      "Borders stable since the 1970s–80s (Upper Volta → Burkina Faso, 1984). Same seven states as the coup and conflict charts.",
  },
];

export type RegionStyle = {
  fill: string;
  fillOpacity: number;
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
  label: string;
};

export function styleForRegion(
  eraId: string,
  numericId: string,
): RegionStyle {
  const peer = numericToPeer[numericId];
  const name = peer ? peerCountryLabels[peer] : "Unknown";
  const color = peer ? peerCountryColors[peer] : "#1a1814";
  const inAof = aofNumericIds.has(numericId);

  if (eraId === "1930") {
    if (inAof) {
      return {
        fill: "#5c1a1a",
        fillOpacity: 0.72,
        stroke: "#f5f1e8",
        strokeWidth: 1,
        strokeDasharray: "3 2",
        label: `${name} (AOF)`,
      };
    }
    if (numericId === "270") {
      return {
        fill: peerCountryColors.gambia,
        fillOpacity: 0.9,
        stroke: "#1a181440",
        strokeWidth: 1,
        label: "British Gambia",
      };
    }
    return {
      fill: peerCountryColors["guinea-bissau"],
      fillOpacity: 0.9,
      stroke: "#1a181440",
      strokeWidth: 1,
      label: "Portuguese Guinea",
    };
  }

  if (eraId === "1850") {
    return {
      fill: color,
      fillOpacity: 0.38,
      stroke: color,
      strokeWidth: 1.5,
      label: `${name} (reference)`,
    };
  }

  const displayName =
    eraId === "1960" && peer === "burkina-faso" ? "Upper Volta" : name;

  return {
    fill: color,
    fillOpacity: 0.92,
    stroke: peer === "senegal" ? "#1a1814" : "#1a181430",
    strokeWidth: peer === "senegal" ? 1.5 : 0.75,
    label: displayName,
  };
}

export const mapFootnote =
  "Country boundaries from Natural Earth 110m (world-atlas). Faint neighbors (Côte d'Ivoire, Niger, Ghana) are for orientation only. Pre-colonial era uses present-day geometry as a location reference — polities were not fixed states.";

export type PeerFeature = Feature<
  Geometry,
  { name: string; numericId: string; layer: "peer" | "context" }
>;

export type PeerFeatureCollection = FeatureCollection<
  Geometry,
  { name: string; numericId: string; layer: "peer" | "context" }
>;
