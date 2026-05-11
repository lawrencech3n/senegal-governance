export type ExportCategoryPoint = {
  year: number;
  totalUsdM: number;
  fuelUsdM: number;
  oresMetalsUsdM: number;
  foodUsdM: number;
  agriRawUsdM: number;
};

// World Bank merchandise exports (current US$) and composition shares.
// Total: TX.VAL.MRCH.CD.WT
// Shares: TX.VAL.FUEL.ZS.UN, TX.VAL.MMTL.ZS.UN, TX.VAL.FOOD.ZS.UN, TX.VAL.AGRI.ZS.UN
// API: https://api.worldbank.org/
export const exportsByCategoryByYear: ExportCategoryPoint[] = [
  {
    "year": 1962,
    "totalUsdM": 124.0,
    "fuelUsdM": 0.05,
    "oresMetalsUsdM": 6.85,
    "foodUsdM": 110.9,
    "agriRawUsdM": 1.28
  },
  {
    "year": 1963,
    "totalUsdM": 122.0,
    "fuelUsdM": 0.02,
    "oresMetalsUsdM": 7.55,
    "foodUsdM": 104.07,
    "agriRawUsdM": 0.62
  },
  {
    "year": 1964,
    "totalUsdM": 133.0,
    "fuelUsdM": 0.04,
    "oresMetalsUsdM": 11.23,
    "foodUsdM": 114.84,
    "agriRawUsdM": 1.23
  },
  {
    "year": 1965,
    "totalUsdM": 130.0,
    "fuelUsdM": 0.02,
    "oresMetalsUsdM": 11.26,
    "foodUsdM": 112.91,
    "agriRawUsdM": 1.55
  },
  {
    "year": 1966,
    "totalUsdM": 150.0,
    "fuelUsdM": 0.25,
    "oresMetalsUsdM": 11.36,
    "foodUsdM": 129.06,
    "agriRawUsdM": 1.11
  },
  {
    "year": 1967,
    "totalUsdM": 139.0,
    "fuelUsdM": 0.05,
    "oresMetalsUsdM": 11.15,
    "foodUsdM": 118.96,
    "agriRawUsdM": 1.91
  },
  {
    "year": 1968,
    "totalUsdM": 153.0,
    "fuelUsdM": 0.02,
    "oresMetalsUsdM": 11.17,
    "foodUsdM": 125.01,
    "agriRawUsdM": 2.17
  },
  {
    "year": 1969,
    "totalUsdM": 125.0,
    "fuelUsdM": 3.07,
    "oresMetalsUsdM": 12.34,
    "foodUsdM": 83.86,
    "agriRawUsdM": 4.52
  },
  {
    "year": 1970,
    "totalUsdM": 152.0,
    "fuelUsdM": 4.48,
    "oresMetalsUsdM": 14.11,
    "foodUsdM": 98.43,
    "agriRawUsdM": 6.29
  },
  {
    "year": 1971,
    "totalUsdM": 125.0,
    "fuelUsdM": 7.31,
    "oresMetalsUsdM": 15.93,
    "foodUsdM": 66.24,
    "agriRawUsdM": 6.9
  },
  {
    "year": 1972,
    "totalUsdM": 216.0,
    "fuelUsdM": 8.75,
    "oresMetalsUsdM": 22.14,
    "foodUsdM": 140.31,
    "agriRawUsdM": 7.19
  },
  {
    "year": 1973,
    "totalUsdM": 195.0,
    "fuelUsdM": 11.46,
    "oresMetalsUsdM": 26.14,
    "foodUsdM": 104.63,
    "agriRawUsdM": 9.66
  },
  {
    "year": 1974,
    "totalUsdM": 391.0,
    "fuelUsdM": 22.08,
    "oresMetalsUsdM": 111.9,
    "foodUsdM": 188.52,
    "agriRawUsdM": 15.13
  },
  {
    "year": 1975,
    "totalUsdM": 461.0,
    "fuelUsdM": 32.32,
    "oresMetalsUsdM": 110.71,
    "foodUsdM": 239.91,
    "agriRawUsdM": 9.04
  },
  {
    "year": 1977,
    "totalUsdM": 624.0,
    "fuelUsdM": 52.12,
    "oresMetalsUsdM": 74.56,
    "foodUsdM": 401.77,
    "agriRawUsdM": 23.77
  },
  {
    "year": 1978,
    "totalUsdM": 449.0,
    "fuelUsdM": 64.29,
    "oresMetalsUsdM": 81.16,
    "foodUsdM": 218.71,
    "agriRawUsdM": 19.95
  },
  {
    "year": 1979,
    "totalUsdM": 535.0,
    "fuelUsdM": 66.42,
    "oresMetalsUsdM": 88.76,
    "foodUsdM": 320.91,
    "agriRawUsdM": 18.07
  },
  {
    "year": 1980,
    "totalUsdM": 477.0,
    "fuelUsdM": 89.59,
    "oresMetalsUsdM": 95.28,
    "foodUsdM": 205.34,
    "agriRawUsdM": 14.61
  },
  {
    "year": 1981,
    "totalUsdM": 500.0,
    "fuelUsdM": 187.06,
    "oresMetalsUsdM": 70.65,
    "foodUsdM": 133.41,
    "agriRawUsdM": 10.56
  },
  {
    "year": 1986,
    "totalUsdM": 625.0,
    "fuelUsdM": 121.84,
    "oresMetalsUsdM": 71.21,
    "foodUsdM": 256.96,
    "agriRawUsdM": 15.23
  },
  {
    "year": 1987,
    "totalUsdM": 606.0,
    "fuelUsdM": 114.4,
    "oresMetalsUsdM": 49.78,
    "foodUsdM": 274.5,
    "agriRawUsdM": 14.71
  },
  {
    "year": 1996,
    "totalUsdM": 988.0,
    "fuelUsdM": 221.92,
    "oresMetalsUsdM": 123.19,
    "foodUsdM": 93.78,
    "agriRawUsdM": 70.51
  },
  {
    "year": 1997,
    "totalUsdM": 905.0,
    "fuelUsdM": 240.45,
    "oresMetalsUsdM": 117.62,
    "foodUsdM": 56.21,
    "agriRawUsdM": 72.49
  },
  {
    "year": 1998,
    "totalUsdM": 968.0,
    "fuelUsdM": 174.44,
    "oresMetalsUsdM": 80.27,
    "foodUsdM": 148.31,
    "agriRawUsdM": 53.57
  },
  {
    "year": 1999,
    "totalUsdM": 1027.0,
    "fuelUsdM": 176.41,
    "oresMetalsUsdM": 100.93,
    "foodUsdM": 138.08,
    "agriRawUsdM": 27.9
  },
  {
    "year": 2000,
    "totalUsdM": 920.0,
    "fuelUsdM": 129.01,
    "oresMetalsUsdM": 43.72,
    "foodUsdM": 481.63,
    "agriRawUsdM": 16.07
  },
  {
    "year": 2001,
    "totalUsdM": 1003.0,
    "fuelUsdM": 178.86,
    "oresMetalsUsdM": 44.97,
    "foodUsdM": 462.79,
    "agriRawUsdM": 23.37
  },
  {
    "year": 2002,
    "totalUsdM": 1067.0,
    "fuelUsdM": 244.92,
    "oresMetalsUsdM": 63.13,
    "foodUsdM": 172.83,
    "agriRawUsdM": 35.57
  },
  {
    "year": 2003,
    "totalUsdM": 1257.0,
    "fuelUsdM": 252.82,
    "oresMetalsUsdM": 42.32,
    "foodUsdM": 466.94,
    "agriRawUsdM": 43.35
  },
  {
    "year": 2004,
    "totalUsdM": 1509.0,
    "fuelUsdM": 292.99,
    "oresMetalsUsdM": 58.22,
    "foodUsdM": 528.12,
    "agriRawUsdM": 41.87
  },
  {
    "year": 2005,
    "totalUsdM": 1578.0,
    "fuelUsdM": 332.32,
    "oresMetalsUsdM": 44.31,
    "foodUsdM": 454.82,
    "agriRawUsdM": 33.22
  },
  {
    "year": 2006,
    "totalUsdM": 1594.0,
    "fuelUsdM": 0.41,
    "oresMetalsUsdM": 108.48,
    "foodUsdM": 684.79,
    "agriRawUsdM": 82.17
  },
  {
    "year": 2007,
    "totalUsdM": 1674.0,
    "fuelUsdM": 322.52,
    "oresMetalsUsdM": 68.62,
    "foodUsdM": 615.92,
    "agriRawUsdM": 48.8
  },
  {
    "year": 2008,
    "totalUsdM": 2170.0,
    "fuelUsdM": 737.15,
    "oresMetalsUsdM": 91.35,
    "foodUsdM": 442.43,
    "agriRawUsdM": 33.72
  },
  {
    "year": 2009,
    "totalUsdM": 2017.0,
    "fuelUsdM": 440.7,
    "oresMetalsUsdM": 61.95,
    "foodUsdM": 542.18,
    "agriRawUsdM": 20.11
  },
  {
    "year": 2010,
    "totalUsdM": 2161.0,
    "fuelUsdM": 451.79,
    "oresMetalsUsdM": 76.21,
    "foodUsdM": 578.21,
    "agriRawUsdM": 28.94
  },
  {
    "year": 2011,
    "totalUsdM": 2542.0,
    "fuelUsdM": 374.46,
    "oresMetalsUsdM": 94.29,
    "foodUsdM": 776.35,
    "agriRawUsdM": 36.48
  },
  {
    "year": 2012,
    "totalUsdM": 2532.0,
    "fuelUsdM": 360.85,
    "oresMetalsUsdM": 103.94,
    "foodUsdM": 679.79,
    "agriRawUsdM": 43.88
  },
  {
    "year": 2013,
    "totalUsdM": 2661.0,
    "fuelUsdM": 439.2,
    "oresMetalsUsdM": 109.47,
    "foodUsdM": 905.57,
    "agriRawUsdM": 63.6
  },
  {
    "year": 2014,
    "totalUsdM": 2750.0,
    "fuelUsdM": 460.95,
    "oresMetalsUsdM": 127.2,
    "foodUsdM": 956.19,
    "agriRawUsdM": 62.85
  },
  {
    "year": 2015,
    "totalUsdM": 2612.0,
    "fuelUsdM": 362.49,
    "oresMetalsUsdM": 212.43,
    "foodUsdM": 819.12,
    "agriRawUsdM": 50.47
  },
  {
    "year": 2016,
    "totalUsdM": 2640.0,
    "fuelUsdM": 282.16,
    "oresMetalsUsdM": 176.7,
    "foodUsdM": 850.6,
    "agriRawUsdM": 51.36
  },
  {
    "year": 2017,
    "totalUsdM": 2989.0,
    "fuelUsdM": 441.74,
    "oresMetalsUsdM": 224.55,
    "foodUsdM": 1023.18,
    "agriRawUsdM": 53.98
  },
  {
    "year": 2018,
    "totalUsdM": 3623.0,
    "fuelUsdM": 571.41,
    "oresMetalsUsdM": 249.85,
    "foodUsdM": 1169.96,
    "agriRawUsdM": 66.26
  },
  {
    "year": 2019,
    "totalUsdM": 4179.0,
    "fuelUsdM": 831.99,
    "oresMetalsUsdM": 276.78,
    "foodUsdM": 1375.68,
    "agriRawUsdM": 45.1
  },
  {
    "year": 2020,
    "totalUsdM": 3929.0,
    "fuelUsdM": 628.14,
    "oresMetalsUsdM": 265.3,
    "foodUsdM": 1231.6,
    "agriRawUsdM": 53.94
  },
  {
    "year": 2021,
    "totalUsdM": 5202.0,
    "fuelUsdM": 807.68,
    "oresMetalsUsdM": 377.82,
    "foodUsdM": 1577.57,
    "agriRawUsdM": 64.06
  },
  {
    "year": 2022,
    "totalUsdM": 5710.0,
    "fuelUsdM": 1042.25,
    "oresMetalsUsdM": 495.23,
    "foodUsdM": 1540.66,
    "agriRawUsdM": 81.77
  },
  {
    "year": 2023,
    "totalUsdM": 5317.0,
    "fuelUsdM": 1141.93,
    "oresMetalsUsdM": 420.66,
    "foodUsdM": 1414.22,
    "agriRawUsdM": 60.44
  },
  {
    "year": 2024,
    "totalUsdM": 6405.0,
    "fuelUsdM": 2095.17,
    "oresMetalsUsdM": 502.8,
    "foodUsdM": 1382.74,
    "agriRawUsdM": 53.75
  }
];

export const exportComposition2020: { category: string; usdM: number }[] = [
  {
    "category": "Fuel",
    "usdM": 628.14
  },
  {
    "category": "Ores & metals",
    "usdM": 265.3
  },
  {
    "category": "Food",
    "usdM": 1231.6
  },
  {
    "category": "Agricultural raw materials",
    "usdM": 53.94
  }
];

export const majorOperators: {
  name: string;
  origin: string;
  resource: string;
  era: string;
  notes: string;
}[] = [
  {
    name: "Industries Chimiques du Sénégal (ICS)",
    origin: "Senegal / multinational ownership",
    resource: "Phosphates & fertilizer",
    era: "Postcolonial",
    notes: "One of Senegal’s largest industrial groups; operates phosphate mining and fertilizer production around Taïba and Darou.",
  },
  {
    name: "Sabodala-Massawa (Endeavour Mining)",
    origin: "Canada/UK-listed",
    resource: "Gold",
    era: "Postcolonial",
    notes: "Large-scale gold mining in southeastern Senegal; among the country’s most significant modern extractive projects.",
  },
];
