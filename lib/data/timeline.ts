export type TimelineEvent = {
  year: number;
  title: string;
  body: string;
  category:
    | "colonization"
    | "extraction"
    | "politics"
    | "war"
    | "post-colonial";
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1659,
    title: "Saint-Louis founded",
    body: "France establishes its first permanent trading post on the Senegal River — the anchor of later colonial administration in the territory.",
    category: "colonization",
  },
  {
    year: 1895,
    title: "French West Africa (AOF) created",
    body: "Senegal becomes the capital of the federation of French West Africa. Dakar is built as an imperial administrative hub governing much of the Sahel.",
    category: "colonization",
  },
  {
    year: 1914,
    title: "World War I mobilization",
    body: "Tirailleurs sénégalais are recruited in large numbers. Military service becomes a channel of contact with the metropole — and a basis for later political claims.",
    category: "politics",
  },
  {
    year: 1946,
    title: "French Union & overseas citizenship",
    body: "The Lamine Guèye law grants French citizenship to colonial subjects. Senegalese deputies sit in Paris; the legal framework of assimilation is tested in practice.",
    category: "politics",
  },
  {
    year: 1956,
    title: "Loi-cadre decentralization",
    body: "France grants limited self-government to overseas territories. Political parties organize openly; the path toward negotiated independence accelerates.",
    category: "politics",
  },
  {
    year: 1958,
    title: "Referendum on the French Community",
    body: "Senegal votes to remain inside de Gaulle’s French Community rather than join the Mali Federation immediately — a choice that shapes its distinct post-colonial trajectory.",
    category: "politics",
  },
  {
    year: 1959,
    title: "Mali Federation formed",
    body: "Senegal joins Sudan (French Sudan) in the Mali Federation. The experiment lasts barely a year before Dakar and Bamako split over federal power.",
    category: "politics",
  },
  {
    year: 1960,
    title: "Independence (4 April)",
    body: "Senegal leaves the Mali Federation and becomes independent. Léopold Sédar Senghor becomes president. France retains bases, currency ties, and economic influence.",
    category: "post-colonial",
  },
  {
    year: 1963,
    title: "One-party consolidation",
    body: "Senghor’s Union Progressiste Sénégalaise dominates politics. Opposition is managed rather than crushed — a pattern scholars link to lower coup risk than in more militarized neighbors.",
    category: "politics",
  },
  {
    year: 1980,
    title: "Senghor resigns",
    body: "Senghor voluntarily steps down and hands power to Abdou Diouf — a rare peaceful leadership transition in a region of coups.",
    category: "post-colonial",
  },
  {
    year: 1982,
    title: "Casamance conflict begins",
    body: "Separatist violence erupts in the south. It remains low-intensity compared to civil wars elsewhere in West Africa, but it is Senegal’s longest-running security challenge.",
    category: "war",
  },
  {
    year: 2000,
    title: "First alternation of power",
    body: "Abdoulaye Wade defeats Abdou Diouf in a competitive election — proof that the regime could lose at the ballot box without a coup.",
    category: "post-colonial",
  },
  {
    year: 2012,
    title: "Second alternation",
    body: "Macky Sall defeats Wade after a contested third-term bid. Street mobilization peaks, but the military does not seize power.",
    category: "post-colonial",
  },
  {
    year: 2021,
    title: "Protests & repression",
    body: "Demonstrations over the Sonko case and economic grievances test the state’s tolerance. Instability rises — but still short of neighbor-level collapse.",
    category: "war",
  },
  {
    year: 2024,
    title: "Faye elected",
    body: "Bassirou Diomaye Faye wins on an anti-establishment platform after another cycle of protest and legal conflict — the latest test of whether Senegal’s political settlement holds.",
    category: "post-colonial",
  },
];
