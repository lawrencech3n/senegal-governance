export type PeerCountryId =
  | "senegal"
  | "mali"
  | "guinea"
  | "guinea-bissau"
  | "mauritania"
  | "gambia"
  | "burkina-faso";

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

export type MapRegion = {
  id: string;
  label: string;
  path: string;
  fill: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  peerCountry?: PeerCountryId | null;
  labelX: number;
  labelY: number;
  fontSize?: number;
};

export type MapEra = {
  id: string;
  label: string;
  year: string;
  title: string;
  description: string;
  regions: MapRegion[];
};

/** Simplified paths in viewBox 0 0 480 520 — illustrative, not survey-grade. */
const modern: MapRegion[] = [
  {
    id: "mauritania",
    label: "Mauritania",
    peerCountry: "mauritania",
    fill: peerCountryColors.mauritania,
    labelX: 200,
    labelY: 55,
    path: "M 24 28 L 420 28 L 448 72 L 400 98 L 130 98 L 24 82 Z",
  },
  {
    id: "senegal",
    label: "Senegal",
    peerCountry: "senegal",
    fill: peerCountryColors.senegal,
    labelX: 72,
    labelY: 168,
    path: "M 24 82 L 130 98 L 138 208 L 96 228 L 28 218 Z",
  },
  {
    id: "gambia",
    label: "The Gambia",
    peerCountry: "gambia",
    fill: peerCountryColors.gambia,
    labelX: 58,
    labelY: 188,
    fontSize: 8,
    path: "M 46 162 L 62 162 L 62 198 L 46 198 Z",
  },
  {
    id: "guinea-bissau",
    label: "Guinea-Bissau",
    peerCountry: "guinea-bissau",
    fill: peerCountryColors["guinea-bissau"],
    labelX: 58,
    labelY: 248,
    fontSize: 9,
    path: "M 28 218 L 96 228 L 88 278 L 32 268 Z",
  },
  {
    id: "guinea",
    label: "Guinea",
    peerCountry: "guinea",
    fill: peerCountryColors.guinea,
    labelX: 88,
    labelY: 340,
    path: "M 32 268 L 138 248 L 152 408 L 48 398 Z",
  },
  {
    id: "mali",
    label: "Mali",
    peerCountry: "mali",
    fill: peerCountryColors.mali,
    labelX: 248,
    labelY: 210,
    path: "M 130 98 L 400 98 L 432 168 L 392 328 L 168 308 L 138 208 Z",
  },
  {
    id: "burkina",
    label: "Burkina Faso",
    peerCountry: "burkina-faso",
    fill: peerCountryColors["burkina-faso"],
    labelX: 318,
    labelY: 348,
    path: "M 268 288 L 432 168 L 456 368 L 312 398 L 252 332 Z",
  },
];

const colonial1930: MapRegion[] = [
  {
    id: "aof",
    label: "AOF (Dakar capital)",
    peerCountry: null,
    fill: "#5c1a1a",
    fillOpacity: 0.55,
    labelX: 248,
    labelY: 200,
    path: "M 24 28 L 448 72 L 456 368 L 48 398 L 28 218 L 24 82 Z",
  },
  {
    id: "aof-senegal",
    label: "Senegal",
    peerCountry: "senegal",
    fill: "transparent",
    stroke: "#f5f1e8",
    strokeWidth: 1,
    strokeDasharray: "4 3",
    labelX: 72,
    labelY: 148,
    fontSize: 9,
    path: "M 24 82 L 130 98 L 138 208 L 96 228 L 28 218 Z",
  },
  {
    id: "aof-mali",
    label: "French Sudan (Mali)",
    peerCountry: "mali",
    fill: "transparent",
    stroke: "#f5f1e8",
    strokeWidth: 1,
    strokeDasharray: "4 3",
    labelX: 248,
    labelY: 230,
    fontSize: 9,
    path: "M 130 98 L 400 98 L 432 168 L 392 328 L 168 308 L 138 208 Z",
  },
  {
    id: "aof-guinea",
    label: "Guinea",
    peerCountry: "guinea",
    fill: "transparent",
    stroke: "#f5f1e8",
    strokeWidth: 1,
    strokeDasharray: "4 3",
    labelX: 88,
    labelY: 330,
    fontSize: 9,
    path: "M 32 268 L 138 248 L 152 408 L 48 398 Z",
  },
  {
    id: "aof-burkina",
    label: "Upper Volta",
    peerCountry: "burkina-faso",
    fill: "transparent",
    stroke: "#f5f1e8",
    strokeWidth: 1,
    strokeDasharray: "4 3",
    labelX: 318,
    labelY: 330,
    fontSize: 9,
    path: "M 268 288 L 432 168 L 456 368 L 312 398 L 252 332 Z",
  },
  {
    id: "aof-mauritania",
    label: "Mauritania",
    peerCountry: "mauritania",
    fill: "transparent",
    stroke: "#f5f1e8",
    strokeWidth: 1,
    strokeDasharray: "4 3",
    labelX: 200,
    labelY: 55,
    fontSize: 9,
    path: "M 24 28 L 420 28 L 448 72 L 400 98 L 130 98 L 24 82 Z",
  },
  {
    id: "gambia-british",
    label: "British Gambia",
    peerCountry: "gambia",
    fill: peerCountryColors.gambia,
    labelX: 58,
    labelY: 188,
    fontSize: 8,
    path: "M 46 162 L 62 162 L 62 198 L 46 198 Z",
  },
  {
    id: "gb-portuguese",
    label: "Portuguese Guinea",
    peerCountry: "guinea-bissau",
    fill: peerCountryColors["guinea-bissau"],
    labelX: 58,
    labelY: 248,
    fontSize: 9,
    path: "M 28 218 L 96 228 L 88 278 L 32 268 Z",
  },
];

const precolonial1850: MapRegion[] = [
  {
    id: "wolof-coast",
    label: "Wolof & coastal states",
    peerCountry: "senegal",
    fill: peerCountryColors.senegal,
    fillOpacity: 0.75,
    labelX: 78,
    labelY: 138,
    fontSize: 9,
    path: "M 28 108 L 118 118 L 122 178 L 72 188 L 32 172 Z",
  },
  {
    id: "futa-toro",
    label: "Futa Toro",
    peerCountry: "senegal",
    fill: peerCountryColors.senegal,
    fillOpacity: 0.55,
    labelX: 98,
    labelY: 118,
    fontSize: 8,
    path: "M 72 98 L 148 108 L 142 148 L 88 158 L 68 128 Z",
  },
  {
    id: "kaabu",
    label: "Kaabu / Casamance",
    peerCountry: "senegal",
    fill: peerCountryColors.senegal,
    fillOpacity: 0.45,
    labelX: 72,
    labelY: 218,
    fontSize: 8,
    path: "M 32 172 L 96 188 L 88 248 L 38 238 Z",
  },
  {
    id: "gambia-corridor",
    label: "Gambia River corridor",
    peerCountry: "gambia",
    fill: peerCountryColors.gambia,
    labelX: 58,
    labelY: 178,
    fontSize: 8,
    path: "M 44 158 L 68 158 L 66 202 L 42 200 Z",
  },
  {
    id: "futa-jallon",
    label: "Futa Jallon",
    peerCountry: "guinea",
    fill: peerCountryColors.guinea,
    labelX: 98,
    labelY: 318,
    fontSize: 9,
    path: "M 48 248 L 138 238 L 148 388 L 58 378 Z",
  },
  {
    id: "gabu",
    label: "Gabu region",
    peerCountry: "guinea-bissau",
    fill: peerCountryColors["guinea-bissau"],
    labelX: 58,
    labelY: 258,
    fontSize: 8,
    path: "M 34 228 L 88 248 L 82 278 L 36 268 Z",
  },
  {
    id: "macina",
    label: "Tukulor / Macina",
    peerCountry: "mali",
    fill: peerCountryColors.mali,
    labelX: 228,
    labelY: 198,
    fontSize: 9,
    path: "M 118 118 L 368 108 L 398 188 L 348 288 L 168 278 L 142 178 Z",
  },
  {
    id: "mossi",
    label: "Mossi states",
    peerCountry: "burkina-faso",
    fill: peerCountryColors["burkina-faso"],
    labelX: 318,
    labelY: 328,
    fontSize: 9,
    path: "M 268 278 L 408 188 L 438 358 L 302 388 L 248 318 Z",
  },
  {
    id: "emirates",
    label: "Sanhadja emirates",
    peerCountry: "mauritania",
    fill: peerCountryColors.mauritania,
    labelX: 200,
    labelY: 58,
    fontSize: 9,
    path: "M 24 28 L 408 28 L 438 78 L 368 108 L 118 98 L 24 82 Z",
  },
];

export const mapEras: MapEra[] = [
  {
    id: "1850",
    label: "c. 1850",
    year: "Pre-colonial",
    title: "Polities before the scramble",
    description:
      "Fluid boundaries — Wolof states, Futa Toro, Kaabu, Futa Jallon, Mossi kingdoms, and emirates. Colors show rough overlap with today’s peer countries, not fixed borders.",
    regions: precolonial1850,
  },
  {
    id: "1930",
    label: "1930",
    year: "Colonial",
    title: "Partition under empire",
    description:
      "French West Africa (AOF) unifies most Francophone peers under Dakar; British Gambia and Portuguese Guinea remain separate jurisdictions.",
    regions: colonial1930,
  },
  {
    id: "1960",
    label: "1960",
    year: "Independence",
    title: "Flags change, lines mostly hold",
    description:
      "Independence year for most peers. Upper Volta, Mali, Senegal, Guinea, and Mauritania exit as separate republics; The Gambia (1965) and Guinea-Bissau (1974) follow on different timetables.",
    regions: modern.map((r) =>
      r.id === "burkina" ? { ...r, label: "Upper Volta" } : r,
    ),
  },
  {
    id: "today",
    label: "Today",
    year: "Present",
    title: "Current peer set",
    description:
      "Borders stable since the 1970s–80s (Upper Volta → Burkina Faso, 1984). Same seven-state comparison used in the coup and conflict charts.",
    regions: modern,
  },
];

export const mapFootnote =
  "Schematic map for comparison only — not GIS-accurate. Coastline and borders are simplified; pre-colonial zones overlapped and shifted. Peer countries match the methodology box on the overview.";

export const peerCountryOrder: PeerCountryId[] = [
  "senegal",
  "mali",
  "guinea",
  "guinea-bissau",
  "mauritania",
  "gambia",
  "burkina-faso",
];
