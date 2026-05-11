export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
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
    description: "Placeholder description.",
    category: "politics",
  },
];
