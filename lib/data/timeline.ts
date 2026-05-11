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
    year: 1960,
    title: "Placeholder event",
    body: "Placeholder description.",
    category: "politics",
  },
];
