"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineEvents, type TimelineEvent } from "@/lib/data/timeline";

const categoryColor: Record<TimelineEvent["category"], string> = {
  colonization: "bg-oxblood",
  extraction: "bg-ochre",
  politics: "bg-sage",
  war: "bg-rust",
  "post-colonial": "bg-ink",
};

const categoryLabel: Record<TimelineEvent["category"], string> = {
  colonization: "Colonization",
  extraction: "Extraction",
  politics: "Politics",
  war: "War",
  "post-colonial": "Post-colonial",
};

const allCategories = Object.keys(categoryLabel) as TimelineEvent["category"][];

export function Timeline() {
  const sortedAll = useMemo(
    () => [...timelineEvents].sort((a, b) => a.year - b.year),
    [],
  );

  const [filter, setFilter] = useState<TimelineEvent["category"] | "all">(
    "all",
  );
  const sorted = useMemo(
    () =>
      filter === "all"
        ? sortedAll
        : sortedAll.filter((e) => e.category === filter),
    [sortedAll, filter],
  );

  const [activeIdx, setActiveIdx] = useState(0);

  const safeIdx = Math.min(activeIdx, Math.max(0, sorted.length - 1));
  const minYear = sortedAll[0]?.year ?? 1659;
  const maxYear = sortedAll[sortedAll.length - 1]?.year ?? 2024;
  const active = sorted[safeIdx] ?? sortedAll[0];

  const toggleFilter = (cat: TimelineEvent["category"] | "all") => {
    setFilter(cat);
    setActiveIdx(0);
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink/70 max-w-2xl">
        Filter by type to see how colonial rule, political transitions, and
        violence cluster — or click any dot to read an event. The arc from
        colonization to post-colonial alternations is the governance story.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter timeline by category">
        <button
          onClick={() => toggleFilter("all")}
          className={`text-xs px-3 py-1.5 border transition ${
            filter === "all"
              ? "bg-ink text-parchment border-ink"
              : "border-ink/30 text-ink/70 hover:border-ink"
          }`}
        >
          All events
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleFilter(cat)}
            className={`text-xs px-3 py-1.5 border transition flex items-center gap-1.5 ${
              filter === cat
                ? "bg-ink text-parchment border-ink"
                : "border-ink/30 text-ink/70 hover:border-ink"
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${categoryColor[cat]}`}
            />
            {categoryLabel[cat]}
          </button>
        ))}
      </div>

      <div className="relative pt-10 pb-16">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink/20" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between text-xs text-ink/50">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>

        <div className="relative h-16">
          {sorted.map((event, idx) => {
            const pct = ((event.year - minYear) / (maxYear - minYear)) * 100;
            const isActive = idx === safeIdx;
            return (
              <button
                key={event.year + event.title}
                onClick={() => setActiveIdx(idx)}
                style={{ left: `${pct}%` }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                aria-label={`${event.year} — ${event.title}`}
                aria-pressed={isActive}
              >
                <span
                  className={`block rounded-full border border-ink/30 transition-all ${
                    categoryColor[event.category]
                  } ${isActive ? "w-5 h-5 ring-4 ring-ink/10" : "w-3 h-3 group-hover:w-4 group-hover:h-4"}`}
                />
                <span
                  className={`absolute top-7 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-opacity ${
                    isActive
                      ? "opacity-100 text-ink"
                      : "opacity-0 group-hover:opacity-70 text-ink/70"
                  }`}
                >
                  {event.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.year + active.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="border border-ink/15 bg-parchment/60 p-8"
        >
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-4xl text-ink">{active.year}</span>
            <span
              className={`text-xs uppercase tracking-[0.2em] px-2 py-1 text-parchment ${categoryColor[active.category]}`}
            >
              {categoryLabel[active.category]}
            </span>
          </div>
          <h3 className="font-serif text-2xl text-ink mb-3">{active.title}</h3>
          <p className="prose-serif text-ink/80 max-w-2xl">{active.body}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveIdx(Math.max(0, safeIdx - 1))}
          disabled={safeIdx === 0}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition disabled:opacity-30"
        >
          ← Prev
        </button>
        <button
          onClick={() =>
            setActiveIdx(Math.min(sorted.length - 1, safeIdx + 1))
          }
          disabled={safeIdx >= sorted.length - 1}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
