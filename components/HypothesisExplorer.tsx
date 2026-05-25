"use client";

import { useState } from "react";
import Link from "next/link";
import { governanceHypotheses } from "@/lib/data/government";

export function HypothesisExplorer() {
  const [active, setActive] = useState(0);
  const h = governanceHypotheses[active];

  return (
    <div className="border border-ink/15 bg-parchment/50 p-5 md:p-6 space-y-4">
      <div>
        <h4 className="font-serif text-xl text-ink mb-1">
          Explore the explanations
        </h4>
        <p className="text-sm text-ink/70">
          Select a hypothesis to see what evidence this project brings to bear.
          None is decisive alone — the point is to compare mechanisms.
        </p>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Governance hypotheses"
      >
        {governanceHypotheses.map((item, i) => (
          <button
            key={item.title}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`text-xs px-3 py-2 border transition ${
              i === active
                ? "bg-ink text-parchment border-ink"
                : "border-ink/30 text-ink/70 hover:border-ink"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="border-t border-ink/10 pt-4 space-y-3">
        <p className="text-sm text-ink/80 leading-relaxed">{h.body}</p>
        <div className="text-sm">
          <span className="font-medium text-ink">Evidence on this site: </span>
          <span className="text-ink/75">{h.evidence}</span>
        </div>
        {h.chartLink && (
          <Link
            href={h.chartLink}
            className="inline-block text-xs uppercase tracking-[0.2em] text-rust hover:text-ink"
          >
            Jump to related section →
          </Link>
        )}
      </div>
    </div>
  );
}
