export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  category: "colonization" | "extraction" | "resistance" | "policy";
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1960,
    title: "Placeholder event",
    description: "Placeholder description.",
    category: "policy",
  },
];

import { timelineEvents, type TimelineEvent } from "@/lib/data/timeline";
