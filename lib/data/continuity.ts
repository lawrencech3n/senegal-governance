export type ContinuityDimension = {
  id: string;
  label: string;
  maxScore: number;
  description: string;
};

export type CountryContinuity = {
  country: string;
  independenceYear: number;
  scores: Record<string, number>;
  note: string;
};

/** Author-coded index: French institutional inheritance at independence. */
export const continuityDimensions: ContinuityDimension[] = [
  {
    id: "adminCenter",
    label: "Imperial admin center",
    maxScore: 2,
    description: "Territory served as AOF capital or major federation hub (Dakar = 2).",
  },
  {
    id: "bureaucracy",
    label: "Inherited bureaucracy",
    maxScore: 2,
    description: "Courts, ministries, and tax apparatus usable on day one without rebuilding.",
  },
  {
    id: "exitPath",
    label: "1958 exit path",
    maxScore: 2,
    description: "French Community referendum: negotiated yes (2), partial (1), rupture/no (0). N/A colonies score 0.",
  },
  {
    id: "cfa",
    label: "CFA franc retained",
    maxScore: 1,
    description: "Stayed in franc zone at independence.",
  },
  {
    id: "securityTies",
    label: "French security ties",
    maxScore: 1,
    description: "Bases, advisors, or defense pacts with France after independence.",
  },
  {
    id: "legalParties",
    label: "Legal code & parties",
    maxScore: 1,
    description: "Francophone civil law and party structures carried over.",
  },
];

/** Peer order matches regional comparison on the Governance page. */
export const continuityScores: CountryContinuity[] = [
  {
    country: "Senegal",
    independenceYear: 1960,
    scores: {
      adminCenter: 2,
      bureaucracy: 2,
      exitPath: 2,
      cfa: 1,
      securityTies: 1,
      legalParties: 1,
    },
    note: "AOF capital; 97.8% yes (1958). Highest continuity in the peer set.",
  },
  {
    country: "Mali",
    independenceYear: 1960,
    scores: {
      adminCenter: 0,
      bureaucracy: 1,
      exitPath: 2,
      cfa: 1,
      securityTies: 1,
      legalParties: 1,
    },
    note: "Yes on Community (1958) but Bamako weaker than Dakar; Mali Federation collapse left sharper military fractures.",
  },
  {
    country: "Guinea",
    independenceYear: 1958,
    scores: {
      adminCenter: 0,
      bureaucracy: 0,
      exitPath: 0,
      cfa: 0,
      securityTies: 0,
      legalParties: 0,
    },
    note: "95% no (1958) — immediate rupture; Conakry not an imperial hub; French firms and officials withdrew.",
  },
  {
    country: "Guinea-Bissau",
    independenceYear: 1974,
    scores: {
      adminCenter: 0,
      bureaucracy: 0,
      exitPath: 0,
      cfa: 0,
      securityTies: 0,
      legalParties: 0,
    },
    note: "Portuguese colony in 1958 — armed liberation, not French Community; no franc-zone or Françafrique inheritance at exit.",
  },
  {
    country: "Mauritania",
    independenceYear: 1960,
    scores: {
      adminCenter: 0,
      bureaucracy: 1,
      exitPath: 2,
      cfa: 1,
      securityTies: 1,
      legalParties: 1,
    },
    note: "Yes on Community (1958); peripheral AOF territory with weaker center than Dakar; CFA at independence.",
  },
  {
    country: "The Gambia",
    independenceYear: 1965,
    scores: {
      adminCenter: 0,
      bureaucracy: 1,
      exitPath: 0,
      cfa: 0,
      securityTies: 0,
      legalParties: 0,
    },
    note: "British colony — no 1958 French referendum, no CFA or Françafrique; common-law inheritance instead.",
  },
  {
    country: "Burkina Faso",
    independenceYear: 1960,
    scores: {
      adminCenter: 0,
      bureaucracy: 1,
      exitPath: 2,
      cfa: 1,
      securityTies: 1,
      legalParties: 1,
    },
    note: "Upper Volta voted yes (1958); standard AOF territory — negotiated exit but no Dakar-scale administrative center.",
  },
];

export const continuityCodingNote =
  "Scores coded by the author from colonial histories (Boone, Conklin, Diouf) and independence sequences on this site. Independence year varies by colony; 1958 exit-path scores apply only to French Community territories. 0 = absent or ruptured. Not a published index — a transparent comparison tool.";

export function totalContinuity(scores: Record<string, number>) {
  return continuityDimensions.reduce(
    (sum, d) => sum + (scores[d.id] ?? 0),
    0,
  );
}

export const maxContinuityTotal = continuityDimensions.reduce(
  (sum, d) => sum + d.maxScore,
  0,
);
