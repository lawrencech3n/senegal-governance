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

export function Timeline() {
  const sorted = useMemo(
    () => [...timelineEvents].sort((a, b) => a.year - b.year),
    [],
  );
  const [activeIdx, setActiveIdx] = useState<number>(sorted.length - 1);
  const minYear = sorted[0].year;
  const maxYear = sorted[sorted.length - 1].year;
  const active = sorted[activeIdx];

  return (
    <div className="space-y-8">
      {/* Track */}
      <div className="relative pt-10 pb-16">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink/20" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between text-xs text-ink/50">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>

        <div className="relative h-16">
          {sorted.map((event, idx) => {
            const pct = ((event.year - minYear) / (maxYear - minYear)) * 100;
            const isActive = idx === activeIdx;
            return (
              <button
                key={event.year + event.title}
                onClick={() => setActiveIdx(idx)}
                style={{ left: `${pct}%` }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                aria-label={`${event.year} — ${event.title}`}
              >
                <span
                  className={`block rounded-full border border-ink/30 transition-all ${
                    categoryColor[event.category]
                  } ${isActive ? "w-5 h-5 ring-4 ring-ink/10" : "w-3 h-3 group-hover:w-4 group-hover:h-4"}`}
                />
                <span
                  className={`absolute top-7 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-opacity ${
                    isActive ? "opacity-100 text-ink" : "opacity-0 group-hover:opacity-70 text-ink/70"
                  }`}
                >
                  {event.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active card */}
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
          onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition disabled:opacity-30"
        >
          ← Prev
        </button>
        <button
          onClick={() => setActiveIdx(Math.min(sorted.length - 1, activeIdx + 1))}
          disabled={activeIdx === sorted.length - 1}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition disabled:opacity-30"
        >
          Next →
        </button>
        <div className="ml-auto flex gap-3 text-xs text-ink/60 items-center">
          {Object.entries(categoryLabel).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${categoryColor[k as TimelineEvent["category"]]}`} />
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
