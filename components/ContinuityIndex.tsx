import Link from "next/link";
import {
  continuityCodingNote,
  continuityDimensions,
  continuityScores,
  maxContinuityTotal,
  totalContinuity,
} from "@/lib/data/continuity";

function scoreCell(value: number, max: number) {
  if (value === 0) return "text-ink/35";
  if (value >= max) return "text-oxblood font-medium";
  return "text-rust";
}

export function ContinuityIndex() {
  return (
    <figure
      id="continuity"
      className="border border-ink/15 bg-parchment/50 overflow-hidden"
    >
      <header className="px-5 py-4 border-b border-ink/10 space-y-2">
        <h3 className="font-serif text-xl md:text-2xl text-ink">
          Institutional continuity at independence (author-coded)
        </h3>
        <p className="text-sm text-ink/70 max-w-3xl leading-relaxed">
          Which structures survived the flag change in 1960? This index scores
          six dimensions for Senegal, Guinea, and Mali — the fork case and a
          peer that inherited a weaker center.{" "}
          <Link href="/culture#fork" className="text-rust underline hover:text-ink">
            See the 1958 paths →
          </Link>
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-parchment/80">
              <th className="text-left font-normal text-xs uppercase tracking-[0.15em] text-ink/50 px-5 py-3">
                Dimension
              </th>
              {continuityScores.map((c) => (
                <th
                  key={c.country}
                  className="text-center font-serif text-lg text-ink px-3 py-3"
                >
                  {c.country}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {continuityDimensions.map((dim) => (
              <tr key={dim.id} className="border-b border-ink/10">
                <td className="px-5 py-3 align-top">
                  <div className="font-medium text-ink">{dim.label}</div>
                  <div className="text-xs text-ink/55 mt-0.5 max-w-xs">
                    {dim.description}
                  </div>
                </td>
                {continuityScores.map((c) => {
                  const value = c.scores[dim.id] ?? 0;
                  return (
                    <td
                      key={c.country}
                      className={`text-center font-serif text-xl px-3 py-3 ${scoreCell(value, dim.maxScore)}`}
                    >
                      {value}/{dim.maxScore}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="bg-parchment/80">
              <td className="px-5 py-4 font-medium text-ink">Total</td>
              {continuityScores.map((c) => {
                const total = totalContinuity(c.scores);
                return (
                  <td
                    key={c.country}
                    className={`text-center font-serif text-3xl px-3 py-4 ${
                      c.country === "Senegal" ? "text-oxblood" : "text-ink"
                    }`}
                  >
                    {total}
                    <span className="text-sm text-ink/45">/{maxContinuityTotal}</span>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <figcaption className="px-5 py-4 space-y-2 text-xs text-ink/55">
        {continuityScores.map((c) => (
          <p key={c.country}>
            <strong className="font-medium text-ink/70">{c.country}:</strong>{" "}
            {c.note}
          </p>
        ))}
        <p className="border-t border-ink/10 pt-2">{continuityCodingNote}</p>
      </figcaption>
    </figure>
  );
}
