"use client";

import { useState } from "react";
import Link from "next/link";
import { governanceHypotheses } from "@/lib/data/government";
import { useTabListKeyboard } from "@/lib/useTabListKeyboard";

const strengthLabel = {
  strong: { text: "Strong quantitative support", width: "w-full", color: "bg-oxblood" },
  moderate: { text: "Partial support", width: "w-2/3", color: "bg-rust" },
  qualitative: { text: "Qualitative / limited data", width: "w-1/3", color: "bg-sage" },
} as const;

export function HypothesisExplorer() {
  const [active, setActive] = useState(0);
  const h = governanceHypotheses[active];
  const strength = strengthLabel[h.strength];
  const onTabKeyDown = useTabListKeyboard(
    governanceHypotheses.length,
    active,
    setActive,
  );

  return (
    <div className="border border-ink/15 bg-parchment/50 p-5 md:p-6 space-y-4">
      <div>
        <h4 className="font-serif text-xl text-ink mb-1">
          Explore the explanations
        </h4>
        <p className="text-sm text-ink/70">
          Pick a hypothesis to see how I read the evidence.
        </p>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Governance hypotheses"
        onKeyDown={onTabKeyDown}
      >
        {governanceHypotheses.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`hypothesis-tab-${i}`}
            aria-selected={i === active}
            aria-controls="hypothesis-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`text-xs px-3 py-2 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
              i === active
                ? "bg-ink text-parchment border-ink"
                : "border-ink/30 text-ink/70 hover:border-ink"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        id="hypothesis-panel"
        role="tabpanel"
        aria-labelledby={`hypothesis-tab-${active}`}
        className="border-t border-ink/10 pt-4 space-y-4"
      >
        <div>
          <div className="flex justify-between text-xs text-ink/60 mb-1">
            <span>How strongly I read the evidence</span>
            <span>{strength.text}</span>
          </div>
          <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}
            />
          </div>
        </div>
        <p className="text-sm text-ink/80 leading-relaxed">{h.body}</p>
        <div className="text-sm">
          <span className="font-medium text-ink">What I point to: </span>
          <span className="text-ink/75">{h.evidence}</span>
        </div>
        {h.chartLink && (
          <Link
            href={h.chartLink}
            className="inline-block text-xs uppercase tracking-[0.2em] text-rust hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
          >
            {h.chartLinkLabel ?? "Jump to related section"} →
          </Link>
        )}
      </div>
    </div>
  );
}
