export const researchQuestion =
  "What explains Senegal's relative political stability compared to neighboring Francophone states since independence?";

export const stakes =
  "In 1960, six Francophone West African states left the same empire. Within a generation, most had coups, civil wars, or both. Senegal did not — and that divergence shaped who could invest, migrate, and learn in peace.";

export const originalInsight = {
  title: "What this project adds",
  body: "Most accounts treat Senegal as culturally exceptional or French-favored. This site tests a narrower, comparative claim: the same colonial power built different state capacity in Dakar than in Bamako or Conakry — and Senegalese elites negotiated continuity rather than rupture at independence. The gap in coups and conflict years (below) is the empirical hook; the colonial-to-republic sequence is the mechanism story.",
  bullets: [
    "A comparative hook — not a Senegal survey — against six Francophone peers since 1960.",
    "An author-coded institutional continuity index at independence (Senegal vs. Guinea vs. Mali).",
    "Evidence you can re-weight: colonial state-building, elite bargains, Sufi mediation, ethnicity, Françafrique.",
    "A progress-studies lens: stability as necessary but insufficient for shared prosperity.",
  ],
};

export const executiveSummary = [
  {
    step: 1,
    label: "The gap",
    href: "#outlier",
    text: "Senegal has zero successful coups since 1960; Francophone peers average far higher on coups and conflict years.",
  },
  {
    step: 2,
    label: "The mechanism",
    href: "#continuity",
    text: "Senegal negotiated exit in 1958 and inherited Dakar’s state apparatus; Guinea chose rupture.",
  },
  {
    step: 3,
    label: "The limit",
    href: "#takeaway",
    text: "Institutional calm bought partial progress — not East Asian growth or regional equality.",
  },
];

export type EvidenceWeight = {
  id: string;
  label: string;
  defaultWeight: number;
  shortLabel: string;
};

export const evidenceWeights: EvidenceWeight[] = [
  {
    id: "colonial",
    label: "Colonial state-building",
    shortLabel: "Colonial admin",
    defaultWeight: 35,
  },
  {
    id: "elite",
    label: "Elite continuity & managed pluralism",
    shortLabel: "Elite continuity",
    defaultWeight: 30,
  },
  {
    id: "francafrique",
    label: "French security & Françafrique",
    shortLabel: "Françafrique",
    defaultWeight: 15,
  },
  {
    id: "ethnic",
    label: "Relative ethnic cohesion",
    shortLabel: "Ethnic cohesion",
    defaultWeight: 10,
  },
  {
    id: "sufi",
    label: "Sufi brotherhoods",
    shortLabel: "Sufi mediation",
    defaultWeight: 10,
  },
];

export function weightingConclusion(
  weights: Record<string, number>,
): string {
  const ranked = [...evidenceWeights].sort(
    (a, b) => (weights[b.id] ?? 0) - (weights[a.id] ?? 0),
  );
  const top = ranked[0]!;
  const second = ranked[1]!;

  if (top.id === "colonial" || top.id === "elite") {
    return `With ${top.shortLabel} and ${second.shortLabel} weighted highest, the coup gap is best explained by inherited state capacity and negotiated succession — not culture alone.`;
  }
  if (top.id === "francafrique") {
    return `With ${top.shortLabel} weighted highest, external security guarantees and post-colonial ties matter most — but that framing understates Senegal's distinctive 1958 path.`;
  }
  if (top.id === "sufi" || top.id === "ethnic") {
    return `With ${top.shortLabel} weighted highest, social structure explains containment of violence — but the quantitative coup gap still points to institutions and elite bargains first.`;
  }
  return `Weighted toward ${top.shortLabel}, the site still shows Senegal as a regional outlier on institutional continuity at independence.`;
}

export const mainArgument = {
  claim:
    "Senegal's relative calm is not an accident of culture alone — it reflects a distinctive colonial inheritance (a strong Dakar-centered state), elite-managed politics after 1960, and social institutions that channel conflict — but that stability has limits and has not guaranteed broad economic progress.",
  mechanism:
    "Institutional continuity lowered the payoff to military seizure of power while keeping enough space for negotiated succession — a pattern rare among peers who inherited weaker bureaucracies and sharper elite fractures.",
};

export const authorSynthesis =
  "If I had to weight the evidence on this site, colonial state-building and negotiated transition matter most for explaining the coup gap; Sufi mediation and Françafrique matter for explaining why violence stayed peripheral (Casamance) rather than national. None of that makes Senegal a model for growth — it bought time for partial progress while leaving inequality and youth unemployment unresolved.";

export const progressLens = {
  title: "Why this matters for progress",
  bottleneck:
    "Political instability destroys the institutional floor — schools close, capital flees, and reform stops. Senegal's comparative advantage was keeping that floor intact.",
  engine:
    "Continuity let health, education, and urbanization advance in Dakar even when GDP growth disappointed. The engine was institutional persistence, not resource windfalls.",
  whoGains:
    "Urban Francophone elites and export-linked sectors benefited most; rural and Casamance populations saw slower convergence — conflict maps onto periphery, not center.",
  futureLearning:
    "For progress studies: stability is a necessary but insufficient condition. The 2021–2024 stress tests ask whether Senegal can renew its settlement without repeating neighbors' ruptures — or whether managed politics will finally exhaust reform capacity.",
  paragraphs: [
    "Institutional breakdown is a development tax: when governments fall to force, schooling stops, investment flees, and reform halts. Senegal paid a different price — it kept the institutional floor intact long enough for partial gains in health, education, and urbanization, even as GDP growth underperformed peers with more volatile politics.",
    "That is not a success story on its own. Senegal remains lower-middle-income, with youth unemployment above 20% and gains concentrated in Dakar while Casamance lags. The open question for progress studies: did the same elite bargains that prevented coups also slow the structural reforms those gains require?",
  ],
};

export const counterpoints = [
  {
    title: "Stability ≠ prosperity",
    body: "No coups since 1960, but Senegal has not matched East Asian growth miracles. Managed politics may trade short-term calm for slower structural change.",
  },
  {
    title: "Casamance is the exception that tests the rule",
    body: "Four decades of insurgency show that ethnic and regional grievances can still produce sustained violence when the center holds elsewhere.",
  },
  {
    title: "Recent stress tests",
    body: "2021–2024 protests, legal battles, and a generational shift (Faye/Sonko) suggest the old settlement is fraying — Senegal's exception may be eroding, not permanent.",
  },
  {
    title: "Selection bias in comparison",
    body: "The Gambia also has zero coups in our dataset but is tiny and different in structure. Mali and Burkina Faso had stronger militaries at independence — comparisons must account for starting conditions.",
  },
];

export const takeaway =
  "Senegal's quiet is real but relative: inherited institutions and managed politics kept the worst regional outcomes at bay — without yet solving shared prosperity.";

export const readingPath = [
  {
    step: 1,
    href: "/government",
    title: "Evidence",
    body: "Use the outlier chart and regional comparison — then trace colonial rule to alternation.",
  },
  {
    step: 2,
    href: "/timeline",
    title: "Sequence",
    body: "Filter the independence arc (1945–1963) to see negotiated exit.",
  },
  {
    step: 3,
    href: "/culture",
    title: "Mechanisms",
    body: "Legacies that bound Senegal to Paris after the flag changed.",
  },
  {
    step: 4,
    href: "/works-cited",
    title: "Sources",
    body: "Datasets and scholarship behind the claims.",
  },
];
