"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { timelineEvents, type TimelineEvent } from "@/lib/data/timeline";

const categoryColor: Record<TimelineEvent["category"], string> = {
  colonization: "bg-oxblood",
  politics: "bg-sage",
  war: "bg-rust",
  "post-colonial": "bg-ink",
};

const categoryLabel: Record<TimelineEvent["category"], string> = {
  colonization: "Colonization",
  politics: "Politics",
  war: "War",
  "post-colonial": "Post-colonial",
};

const allCategories = Object.keys(categoryLabel) as TimelineEvent["category"][];

type PhasePreset = {
  id: string;
  label: string;
  filter: TimelineEvent["category"] | "all";
  yearMin?: number;
  yearMax?: number;
  description: string;
};

const phasePresets: PhasePreset[] = [
  {
    id: "all",
    label: "Full timeline",
    filter: "all",
    description: "Every milestone from 1659 to today.",
  },
  {
    id: "colonial",
    label: "Colonial arc",
    filter: "colonization",
    description: "How France built administrative capacity in Senegal.",
  },
  {
    id: "independence",
    label: "Independence arc",
    filter: "politics",
    yearMin: 1944,
    yearMax: 1963,
    description: "The negotiated path from Brazzaville to republic (1944–1963).",
  },
  {
    id: "tests",
    label: "Post-1960 tests",
    filter: "post-colonial",
    description: "Alternations, Casamance, and 21st-century stress.",
  },
];

const independencePreset = phasePresets.find((p) => p.id === "independence")!;

function EventDetail({ event }: { event: TimelineEvent }) {
  return (
    <>
      <div className="flex items-baseline gap-4 mb-2">
        <span className="font-serif text-4xl text-ink">{event.year}</span>
        <span
          className={`text-xs uppercase tracking-[0.2em] px-2 py-1 text-parchment ${categoryColor[event.category]}`}
        >
          {categoryLabel[event.category]}
        </span>
      </div>
      <h3 className="font-serif text-2xl text-ink mb-3">{event.title}</h3>
      <p className="prose-serif text-ink/80 max-w-2xl">{event.body}</p>
    </>
  );
}

export function Timeline() {
  const reduceMotion = useReducedMotion();

  const sortedAll = useMemo(
    () => [...timelineEvents].sort((a, b) => a.year - b.year),
    [],
  );

  const [filter, setFilter] = useState<TimelineEvent["category"] | "all">(
    independencePreset.filter,
  );
  const [yearRange, setYearRange] = useState<{ min?: number; max?: number }>({
    min: independencePreset.yearMin,
    max: independencePreset.yearMax,
  });

  const sorted = useMemo(
    () =>
      sortedAll.filter((e) => {
        if (filter !== "all" && e.category !== filter) return false;
        if (yearRange.min != null && e.year < yearRange.min) return false;
        if (yearRange.max != null && e.year > yearRange.max) return false;
        return true;
      }),
    [sortedAll, filter, yearRange],
  );

  const [activeIdx, setActiveIdx] = useState(0);

  const safeIdx = Math.min(activeIdx, Math.max(0, sorted.length - 1));
  const rangeMin = sorted[0]?.year ?? sortedAll[0]?.year ?? 1659;
  const rangeMax =
    sorted[sorted.length - 1]?.year ??
    sortedAll[sortedAll.length - 1]?.year ??
    2024;
  const yearSpan = Math.max(rangeMax - rangeMin, 1);
  const active = sorted[safeIdx] ?? sortedAll[0];

  const toggleFilter = (cat: TimelineEvent["category"] | "all") => {
    setFilter(cat);
    setYearRange({});
    setActiveIdx(0);
  };

  const applyPreset = (preset: PhasePreset) => {
    setFilter(preset.filter);
    setYearRange(
      preset.yearMin != null || preset.yearMax != null
        ? { min: preset.yearMin, max: preset.yearMax }
        : {},
    );
    setActiveIdx(0);
  };

  const activePreset =
    phasePresets.find(
      (p) =>
        p.filter === filter &&
        p.yearMin === yearRange.min &&
        p.yearMax === yearRange.max,
    )?.id ?? (filter === "all" && !yearRange.min ? "all" : null);

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink/70 max-w-2xl">
        The timeline opens on the independence arc — the 1944–1963 sequence that
        distinguishes Senegal from Guinea&apos;s immediate rupture. Click any
        event for detail, or switch presets below.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Timeline phase presets">
        {phasePresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset)}
            className={`text-xs px-3 py-2 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
              activePreset === preset.id
                ? "bg-rust text-parchment border-rust"
                : "border-ink/30 text-ink/70 hover:border-rust"
            }`}
            title={preset.description}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter timeline by category">
        <button
          type="button"
          onClick={() => toggleFilter("all")}
          className={`text-xs px-3 py-1.5 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
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
            type="button"
            onClick={() => toggleFilter(cat)}
            className={`text-xs px-3 py-1.5 border transition flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
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

      {/* Mobile: vertical event list */}
      <ol className="md:hidden space-y-2 border border-ink/15 bg-parchment/40 p-4">
        {sorted.map((event, idx) => {
          const isActive = idx === safeIdx;
          return (
            <li key={event.year + event.title}>
              <button
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-pressed={isActive}
                className={`w-full text-left px-3 py-2 border transition ${
                  isActive
                    ? "border-rust bg-parchment/80"
                    : "border-ink/10 hover:border-ink/30"
                }`}
              >
                <span className="font-serif text-lg text-rust mr-2">
                  {event.year}
                </span>
                <span className="text-sm text-ink">{event.title}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal scrubber */}
      <div className="relative pt-10 pb-16 hidden md:block">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink/20" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between text-xs text-ink/50">
          <span>{rangeMin}</span>
          <span>{rangeMax}</span>
        </div>

        <div className="relative h-16">
          {sorted.map((event, idx) => {
            const pct = ((event.year - rangeMin) / yearSpan) * 100;
            const isActive = idx === safeIdx;
            return (
              <button
                key={event.year + event.title}
                type="button"
                onClick={() => setActiveIdx(idx)}
                style={{ left: `${pct}%` }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
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
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="border border-ink/15 bg-parchment/60 p-8"
        >
          <EventDetail event={active} />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveIdx(Math.max(0, safeIdx - 1))}
          disabled={safeIdx === 0}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() =>
            setActiveIdx(Math.min(sorted.length - 1, safeIdx + 1))
          }
          disabled={safeIdx >= sorted.length - 1}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
