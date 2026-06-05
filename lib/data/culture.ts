export const cultureThemes = [
  {
    era: "Colonial rule",
    title: "Indigénat & administrative coercion",
    body: "The Code de l'indigénat (1887) placed most Africans under summary justice and forced labor obligations. Governance was extractive and punitive — but also centralized, giving the post-colonial state a ready-made bureaucracy.",
  },
  {
    era: "Colonial rule",
    title: "Assimilation in theory, association in practice",
    body: "Senegal sent deputies to Paris and produced a Francophone elite (Senghor among them). That elite inherited French legal categories and party structures — tools for stability, but also for continued dependence.",
  },
  {
    era: "Independence & after",
    title: "The CFA franc",
    body: "Senegal kept the franc zone. Monetary policy stayed tied to France and, later, the ECB. Critics call it neo-colonial; defenders note exchange-rate stability. Either way, it is a governance choice that bound Senegal to Paris long after 1960.",
  },
  {
    era: "Independence & after",
    title: "Françafrique & security ties",
    body: "French bases, advisors, and informal networks persisted. Some scholars argue these ties discouraged military takeovers; others stress how they constrained sovereign policy. The relationship is central to explaining Senegal's different path.",
  },
];

export type ForkStep = {
  year: string;
  label: string;
  detail: string;
};

export type IndependencePath = {
  country: string;
  vote: string;
  leader: string;
  steps: ForkStep[];
};

export const independenceFork = {
  title: "1958: Same referendum, different paths",
  subtitle:
    "De Gaulle offered membership in the French Community or immediate independence. Senegal and Guinea — same empire, same year — chose opposite answers. The legacies below follow from that fork.",
  referendum: {
    year: 1958,
    label: "Referendum on the French Community",
  },
  senegal: {
    country: "Senegal",
    vote: "97.8% yes",
    leader: "Senghor · Lamine Guèye",
    steps: [
      {
        year: "1958–59",
        label: "Autonomy in the French Community",
        detail:
          "Republican constitution, African ministers — sovereignty deferred, state apparatus intact.",
      },
      {
        year: "1960",
        label: "Negotiated independence",
        detail:
          "Senghor inherits Dakar’s bureaucracy, courts, and party structures with French bases and CFA retained.",
      },
      {
        year: "After 1960",
        label: "Continuity over rupture",
        detail:
          "Elite-managed politics, CFA franc, Françafrique ties — institutions that outlasted the flag.",
      },
    ],
  } satisfies IndependencePath,
  guinea: {
    country: "Guinea",
    vote: "95% no",
    leader: "Sékou Touré",
    steps: [
      {
        year: "1958",
        label: "Immediate independence",
        detail:
          "Touré rejects the Community — sharp diplomatic and economic rupture with France.",
      },
      {
        year: "1960",
        label: "Sovereignty without inheritance",
        detail:
          "Weaker administrative center than Dakar; French officials and firms withdraw rapidly.",
      },
      {
        year: "After 1960",
        label: "Rupture and instability",
        detail:
          "One-party rule, isolation, and serial military interventions — a different governance trajectory.",
      },
    ],
  } satisfies IndependencePath,
};
