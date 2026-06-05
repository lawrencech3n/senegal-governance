export type ContinuityDimension = {
  id: string;
  label: string;
  maxScore: number;
  description: string;
};

export type CountryContinuity = {
  country: string;
  scores: Record<string, number>;
  note: string;
};

/** Author-coded index: which colonial/post-colonial institutions persisted at independence (1960). */
export const continuityDimensions: ContinuityDimension[] = [
  {
    id: "adminCenter",
    label: "Imperial admin center",
    maxScore: 2,
    description: "Territory served as federation capital or secondary hub (Dakar = AOF seat).",
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
    description: "Negotiated association (yes) vs immediate rupture (no) on French Community referendum.",
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
    description: "Bases, advisors, or formal defense pacts persisted after 1960.",
  },
  {
    id: "legalParties",
    label: "Legal code & parties",
    maxScore: 1,
    description: "Francophone legal categories and party structures carried over.",
  },
];

export const continuityScores: CountryContinuity[] = [
  {
    country: "Senegal",
    scores: {
      adminCenter: 2,
      bureaucracy: 2,
      exitPath: 2,
      cfa: 1,
      securityTies: 1,
      legalParties: 1,
    },
    note: "97.8% yes on 1958 referendum; Dakar inherited intact.",
  },
  {
    country: "Guinea",
    scores: {
      adminCenter: 0,
      bureaucracy: 0,
      exitPath: 0,
      cfa: 0,
      securityTies: 0,
      legalParties: 0,
    },
    note: "95% no — rupture with France; Conakry not an imperial capital.",
  },
  {
    country: "Mali",
    scores: {
      adminCenter: 0,
      bureaucracy: 1,
      exitPath: 1,
      cfa: 1,
      securityTies: 1,
      legalParties: 1,
    },
    note: "Joined Community (1958) but Bamako weaker than Dakar; federation collapse sharpened fractures.",
  },
];

export const continuityCodingNote =
  "Scores coded by the author from colonial histories (Boone, Conklin, Diouf) and independence sequences on this site. 0 = absent or ruptured; max per dimension shown in header. Not a published index — a transparent comparison tool.";

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
