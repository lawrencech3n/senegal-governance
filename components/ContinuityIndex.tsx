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

function countryHeader(country: string) {
  if (country === "Guinea-Bissau") return "G.-Bissau";
  if (country === "Burkina Faso") return "Burkina";
  if (country === "The Gambia") return "Gambia";
  return country;
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
          Which French institutional structures survived each peer&apos;s exit
          from empire? Scored at independence (year varies). Senegal leads the
          set; Guinea and non-French colonies score lowest.{" "}
          <Link href="/#map" className="text-rust underline hover:text-ink">
            Regional map
          </Link>
          {" · "}
          <Link href="/culture#fork" className="text-rust underline hover:text-ink">
            Exit paths
          </Link>
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-parchment/80">
              <th className="sticky left-0 z-10 bg-parchment/95 text-left font-normal text-xs uppercase tracking-[0.15em] text-ink/50 px-5 py-3 min-w-[11rem]">
                Dimension
              </th>
              {continuityScores.map((c) => (
                <th
                  key={c.country}
                  className={`text-center px-2 py-3 min-w-[4.5rem] ${
                    c.country === "Senegal"
                      ? "font-serif text-lg text-oxblood"
                      : "font-serif text-base text-ink"
                  }`}
                >
                  <span className="block">{countryHeader(c.country)}</span>
                  <span className="block text-[0.6rem] font-sans font-normal text-ink/45 mt-0.5">
                    {c.independenceYear}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {continuityDimensions.map((dim) => (
              <tr key={dim.id} className="border-b border-ink/10">
                <td className="sticky left-0 z-10 bg-parchment/95 px-5 py-3 align-top min-w-[11rem]">
                  <div className="font-medium text-ink">{dim.label}</div>
                  <div className="text-xs text-ink/55 mt-0.5 max-w-[10rem]">
                    {dim.description}
                  </div>
                </td>
                {continuityScores.map((c) => {
                  const value = c.scores[dim.id] ?? 0;
                  return (
                    <td
                      key={c.country}
                      className={`text-center font-serif text-lg px-2 py-3 ${scoreCell(value, dim.maxScore)}`}
                    >
                      {value}/{dim.maxScore}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="bg-parchment/80">
              <td className="sticky left-0 z-10 bg-parchment/95 px-5 py-4 font-medium text-ink">
                Total
              </td>
              {continuityScores.map((c) => {
                const total = totalContinuity(c.scores);
                return (
                  <td
                    key={c.country}
                    className={`text-center font-serif text-2xl px-2 py-4 ${
                      c.country === "Senegal" ? "text-oxblood" : "text-ink"
                    }`}
                  >
                    {total}
                    <span className="text-xs text-ink/45">/{maxContinuityTotal}</span>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <figcaption className="px-5 py-4 space-y-1.5 text-xs text-ink/55">
        {continuityScores.map((c) => (
          <p key={c.country}>
            <strong className="font-medium text-ink/70">{c.country}</strong>{" "}
            ({c.independenceYear}): {c.note}
          </p>
        ))}
        <p className="border-t border-ink/10 pt-2 mt-2">{continuityCodingNote}</p>
      </figcaption>
    </figure>
  );
}
