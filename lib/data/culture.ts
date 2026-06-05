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

export type ForkTone = "continuity" | "rupture" | "other";

export type IndependencePath = {
  country: string;
  vote: string;
  leader: string;
  steps: ForkStep[];
  tone: ForkTone;
};

export const independenceFork = {
  title: "1958 and after: How each peer exited empire",
  subtitle:
    "Francophone states faced de Gaulle’s 1958 French Community referendum; Guinea voted no, most peers voted yes. Guinea-Bissau (Portuguese) and The Gambia (British) followed different colonial paths — scored as comparators, not identical forks.",
  referendum: {
    year: 1958,
    label: "French Community referendum (Francophone AOF territories)",
  },
  paths: [
    {
      country: "Senegal",
      vote: "97.8% yes",
      leader: "Senghor · Lamine Guèye",
      tone: "continuity",
      steps: [
        {
          year: "1958–59",
          label: "Autonomy in the French Community",
          detail: "Republican constitution, African ministers — sovereignty deferred, state apparatus intact.",
        },
        {
          year: "1960",
          label: "Negotiated independence",
          detail: "Senghor inherits Dakar’s bureaucracy with French bases and CFA retained.",
        },
        {
          year: "After 1960",
          label: "Continuity over rupture",
          detail: "Elite-managed politics; institutions that outlasted the flag.",
        },
      ],
    },
    {
      country: "Mali",
      vote: "~98% yes",
      leader: "Modibo Keïta",
      tone: "continuity",
      steps: [
        {
          year: "1958–59",
          label: "Yes to French Community",
          detail: "French Sudan joins Community; prepares for federal experiment with Senegal.",
        },
        {
          year: "1960",
          label: "Federation collapse",
          detail: "Mali Federation dissolves — Bamako inherits weaker center than Dakar; army grows in political weight.",
        },
        {
          year: "After 1960",
          label: "Coups follow",
          detail: "Negotiated start, but serial military takeovers from 1968 onward.",
        },
      ],
    },
    {
      country: "Guinea",
      vote: "95% no",
      leader: "Sékou Touré",
      tone: "rupture",
      steps: [
        {
          year: "1958",
          label: "Immediate independence",
          detail: "Touré rejects the Community — sharp diplomatic and economic rupture with France.",
        },
        {
          year: "1960",
          label: "Sovereignty without inheritance",
          detail: "Weaker administrative center; French officials and firms withdraw rapidly.",
        },
        {
          year: "After 1960",
          label: "Isolation and instability",
          detail: "One-party rule and serial military interventions after Touré.",
        },
      ],
    },
    {
      country: "Guinea-Bissau",
      vote: "N/A — Portuguese",
      leader: "PAIGC · Amílcar Cabral",
      tone: "other",
      steps: [
        {
          year: "1958",
          label: "Not in French referendum",
          detail: "Portuguese colony — no French Community choice; liberation war underway.",
        },
        {
          year: "1974",
          label: "Armed independence",
          detail: "State built from insurgency, not inherited colonial ministries.",
        },
        {
          year: "After 1974",
          label: "Different legacy",
          detail: "No CFA or Françafrique at exit; later coups despite small size.",
        },
      ],
    },
    {
      country: "Mauritania",
      vote: "Yes",
      leader: "Moktar Ould Daddah",
      tone: "continuity",
      steps: [
        {
          year: "1958–60",
          label: "Community then republic",
          detail: "Negotiated path like other AOF territories; peripheral nomadic state.",
        },
        {
          year: "1960",
          label: "Independence in franc zone",
          detail: "CFA and French ties retained; weaker bureaucratic depth than Dakar.",
        },
        {
          year: "After 1960",
          label: "Coups despite continuity",
          detail: "High continuity score but six successful coups — ethnic and Sahel stress matter too.",
        },
      ],
    },
    {
      country: "The Gambia",
      vote: "N/A — British",
      leader: "Jawara",
      tone: "other",
      steps: [
        {
          year: "1958",
          label: "Not in French referendum",
          detail: "British colony — self-government path, not French Community.",
        },
        {
          year: "1965",
          label: "Negotiated independence",
          detail: "Peaceful exit from Britain; no CFA, no French security umbrella.",
        },
        {
          year: "After 1965",
          label: "Outlier on coups",
          detail: "Zero coups in dataset but tiny enclave — different structure (see counterpoints).",
        },
      ],
    },
    {
      country: "Burkina Faso",
      vote: "Yes",
      leader: "Yaméogo",
      tone: "continuity",
      steps: [
        {
          year: "1958–60",
          label: "Community membership",
          detail: "Upper Volta votes yes; standard AOF negotiated autonomy sequence.",
        },
        {
          year: "1960",
          label: "Independence with CFA",
          detail: "Francophone legal and party inheritance; no imperial capital.",
        },
        {
          year: "After 1960",
          label: "Coups despite yes vote",
          detail: "Similar 1958 answer to Senegal — different state capacity and military politics.",
        },
      ],
    },
  ] satisfies IndependencePath[],
};
