export type EnvIndicator = {
  year: number;
  forestCoverPct: number; // % of land area (World Bank / FAO)
  fishCaptureMt: number; // metric tons (World Bank / FAO)
};

// Forest area (% of land area): AG.LND.FRST.ZS
// Fish capture production (metric tons): ER.FSH.CAPT.MT
// World Bank API: https://api.worldbank.org/
export const envIndicators: EnvIndicator[] = [
  {
    "year": 1990,
    "forestCoverPct": 48.32,
    "fishCaptureMt": 315154.0
  },
  {
    "year": 1991,
    "forestCoverPct": 48.09,
    "fishCaptureMt": 328731.0
  },
  {
    "year": 1992,
    "forestCoverPct": 47.85,
    "fishCaptureMt": 373380.0
  },
  {
    "year": 1993,
    "forestCoverPct": 47.62,
    "fishCaptureMt": 386132.0
  },
  {
    "year": 1994,
    "forestCoverPct": 47.39,
    "fishCaptureMt": 359887.0
  },
  {
    "year": 1995,
    "forestCoverPct": 47.15,
    "fishCaptureMt": 366312.0
  },
  {
    "year": 1996,
    "forestCoverPct": 46.92,
    "fishCaptureMt": 439209.0
  },
  {
    "year": 1997,
    "forestCoverPct": 46.68,
    "fishCaptureMt": 483468.0
  },
  {
    "year": 1998,
    "forestCoverPct": 46.45,
    "fishCaptureMt": 429531.0
  },
  {
    "year": 1999,
    "forestCoverPct": 46.22,
    "fishCaptureMt": 440926.0
  },
  {
    "year": 2000,
    "forestCoverPct": 45.98,
    "fishCaptureMt": 436005.0
  },
  {
    "year": 2001,
    "forestCoverPct": 45.78,
    "fishCaptureMt": 431252.0
  },
  {
    "year": 2002,
    "forestCoverPct": 45.58,
    "fishCaptureMt": 398040.0
  },
  {
    "year": 2003,
    "forestCoverPct": 45.38,
    "fishCaptureMt": 469284.0
  },
  {
    "year": 2004,
    "forestCoverPct": 45.18,
    "fishCaptureMt": 434525.0
  },
  {
    "year": 2005,
    "forestCoverPct": 44.98,
    "fishCaptureMt": 399848.0
  },
  {
    "year": 2006,
    "forestCoverPct": 44.78,
    "fishCaptureMt": 368390.0
  },
  {
    "year": 2007,
    "forestCoverPct": 44.58,
    "fishCaptureMt": 412360.0
  },
  {
    "year": 2008,
    "forestCoverPct": 44.38,
    "fishCaptureMt": 428299.0
  },
  {
    "year": 2009,
    "forestCoverPct": 44.18,
    "fishCaptureMt": 446200.0
  },
  {
    "year": 2010,
    "forestCoverPct": 43.98,
    "fishCaptureMt": 409715.0
  },
  {
    "year": 2011,
    "forestCoverPct": 43.78,
    "fishCaptureMt": 427135.0
  },
  {
    "year": 2012,
    "forestCoverPct": 43.57,
    "fishCaptureMt": 461077.0
  },
  {
    "year": 2013,
    "forestCoverPct": 43.36,
    "fishCaptureMt": 469596.0
  },
  {
    "year": 2014,
    "forestCoverPct": 43.15,
    "fishCaptureMt": 458530.0
  },
  {
    "year": 2015,
    "forestCoverPct": 42.94,
    "fishCaptureMt": 425449.0
  },
  {
    "year": 2016,
    "forestCoverPct": 42.74,
    "fishCaptureMt": 474179.0
  },
  {
    "year": 2017,
    "forestCoverPct": 42.53,
    "fishCaptureMt": 534940.0
  },
  {
    "year": 2018,
    "forestCoverPct": 42.32,
    "fishCaptureMt": 484655.0
  },
  {
    "year": 2019,
    "forestCoverPct": 42.11,
    "fishCaptureMt": 516141.0
  },
  {
    "year": 2020,
    "forestCoverPct": 41.91,
    "fishCaptureMt": 458363.0
  },
  {
    "year": 2021,
    "forestCoverPct": 41.7,
    "fishCaptureMt": 513957.0
  },
  {
    "year": 2022,
    "forestCoverPct": 41.49,
    "fishCaptureMt": 505896.0
  },
  {
    "year": 2023,
    "forestCoverPct": 41.28,
    "fishCaptureMt": 521653.0
  }
];

export const environmentalImpacts: {
  driver: string;
  title: string;
  body: string;
}[] = [
  {
    driver: "Deforestation & fuelwood",
    title: "Forest loss and fragmentation",
    body: "Forest cover has declined steadily since 1990, reflecting agricultural expansion, charcoal production, and land pressure around growing cities.",
  },
  {
    driver: "Coastal change",
    title: "Mangroves under stress",
    body: "Mangroves have faced long-term pressure from salinization, coastal erosion, and local wood harvesting; restoration projects can be locally significant even when national-level indicators move slowly.",
  },
  {
    driver: "Fisheries",
    title: "Rising pressure on fish stocks",
    body: "Senegal’s coastal fisheries are heavily exploited; industrial and artisanal effort combined with foreign access agreements has raised sustainability concerns.",
  },
];
