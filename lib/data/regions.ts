export type Region = {
  name: string;
  perCapitaUsd1960: number;
  perCapitaUsd2020: number;
  notes: string;
};

export type ExtractionSite = {
  name: string;
  lat: number;
  lng: number;
  resource: string;
  operator: string;
  startedYear: number;
  scale: "industrial" | "offshore" | "artisanal";
};

// Data pending population. Types are exported so the map can compile safely.
export const regions: Region[] = [];
export const extractionSites: ExtractionSite[] = [];
