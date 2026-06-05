"use client";

import { useMemo, useState } from "react";
import {
  evidenceWeights,
  weightingConclusion,
} from "@/lib/data/narrative";

function buildDefaultWeights() {
  return Object.fromEntries(
    evidenceWeights.map((w) => [w.id, w.defaultWeight]),
  );
}

export function EvidenceWeighting() {
  const [weights, setWeights] = useState(buildDefaultWeights);

  const total = useMemo(
    () => evidenceWeights.reduce((sum, w) => sum + (weights[w.id] ?? 0), 0),
    [weights],
  );

  const normalized = useMemo(
    () =>
      Object.fromEntries(
        evidenceWeights.map((w) => [
          w.id,
          total > 0 ? Math.round(((weights[w.id] ?? 0) / total) * 100) : 0,
        ]),
      ),
    [weights, total],
  );

  const conclusion = useMemo(
    () => weightingConclusion(normalized),
    [normalized],
  );

  const reset = () => setWeights(buildDefaultWeights());

  return (
    <section
      id="weighting"
      aria-labelledby="weighting-heading"
      className="border border-ink/15 bg-parchment/40 p-5 md:p-6 space-y-5 max-w-4xl"
    >
      <div className="space-y-2">
        <h3 id="weighting-heading" className="font-serif text-xl text-ink">
          Weight the evidence yourself
        </h3>
        <p className="text-sm text-ink/70 leading-relaxed">
          No single hypothesis wins in the literature. Adjust the sliders to
          reflect how much each explanation matters to you — defaults match the
          author&apos;s synthesis on this site.
        </p>
      </div>

      <div className="space-y-4">
        {evidenceWeights.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor={`weight-${item.id}`} className="text-ink">
                {item.label}
              </label>
              <span className="text-ink/60 tabular-nums">
                {normalized[item.id]}%
              </span>
            </div>
            <input
              id={`weight-${item.id}`}
              type="range"
              min={0}
              max={50}
              value={weights[item.id]}
              onChange={(e) =>
                setWeights((prev) => ({
                  ...prev,
                  [item.id]: Number(e.target.value),
                }))
              }
              className="w-full accent-rust"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-ink/30 hover:bg-ink hover:text-parchment transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          Reset to author defaults
        </button>
      </div>

      <p className="text-sm text-ink/80 leading-relaxed border-l-4 border-sage pl-4">
        <span className="text-xs uppercase tracking-[0.15em] text-rust block mb-1">
          Your weighted read
        </span>
        {conclusion}
      </p>
    </section>
  );
}
