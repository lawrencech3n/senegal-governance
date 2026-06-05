import { regionalComparison } from "@/lib/data/government";
import {
  independenceFork,
  type IndependencePath,
} from "@/lib/data/culture";

function PathColumn({
  path,
  coups,
  yearsOfWar,
  tone,
}: {
  path: IndependencePath;
  coups: number;
  yearsOfWar: number;
  tone: "continuity" | "rupture";
}) {
  const accent =
    tone === "continuity"
      ? "border-sage bg-parchment/60"
      : "border-rust/40 bg-parchment/40";
  const dot = tone === "continuity" ? "bg-sage" : "bg-rust";
  const voteBadge =
    tone === "continuity"
      ? "bg-sage text-parchment"
      : "bg-rust text-parchment";

  return (
    <article className={`border ${accent} p-5 md:p-6 space-y-5 h-full`}>
      <header className="space-y-2">
        <h4 className="font-serif text-2xl text-ink">{path.country}</h4>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-xs uppercase tracking-[0.2em] px-2 py-1 ${voteBadge}`}
          >
            {path.vote}
          </span>
          <span className="text-xs text-ink/55">{path.leader}</span>
        </div>
      </header>

      <ol className="space-y-0 relative">
        {path.steps.map((step, index) => (
          <li
            key={step.label}
            className={`relative pl-6 pb-5 ${
              index < path.steps.length - 1
                ? "border-l border-ink/15 ml-1.5"
                : ""
            }`}
          >
            <span
              className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border border-ink/20 ${dot}`}
              aria-hidden
            />
            <div className="text-xs uppercase tracking-[0.15em] text-rust mb-0.5">
              {step.year}
            </div>
            <div className="font-medium text-ink text-sm">{step.label}</div>
            <p className="text-sm text-ink/70 leading-relaxed mt-1">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <footer className="border-t border-ink/10 pt-4 grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-ink/50 mb-1">
            Coups since 1960
          </div>
          <div className="font-serif text-3xl text-ink leading-none">
            {coups}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-ink/50 mb-1">
            Conflict years
          </div>
          <div className="font-serif text-3xl text-ink leading-none">
            {yearsOfWar}
          </div>
        </div>
      </footer>
    </article>
  );
}

export function IndependenceForkDiagram() {
  const senegalStats = regionalComparison.find((c) => c.country === "Senegal")!;
  const guineaStats = regionalComparison.find((c) => c.country === "Guinea")!;

  return (
    <figure
      id="fork"
      className="border border-ink/15 bg-parchment/40 p-6 md:p-8 space-y-6"
    >
      <figcaption className="space-y-2 max-w-3xl">
        <h3 className="font-serif text-2xl md:text-3xl text-ink">
          {independenceFork.title}
        </h3>
        <p className="text-sm text-ink/70 leading-relaxed">
          {independenceFork.subtitle}
        </p>
      </figcaption>

      <div className="flex flex-col items-center gap-2 py-2">
        <div className="border border-ink/20 bg-parchment px-4 py-3 text-center max-w-md">
          <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
            {independenceFork.referendum.year}
          </div>
          <div className="font-serif text-lg text-ink">
            {independenceFork.referendum.label}
          </div>
        </div>

        <svg
          viewBox="0 0 320 48"
          className="w-48 h-12 text-ink/25 hidden sm:block"
          aria-hidden
        >
          <path
            d="M160 0 V16 M160 16 L48 44 M160 16 L272 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="48" cy="44" r="4" className="fill-sage" />
          <circle cx="272" cy="44" r="4" className="fill-rust" />
        </svg>

        <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-ink/50 sm:hidden">
          <span>↓ Senegal</span>
          <span>↓ Guinea</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <PathColumn
          path={independenceFork.senegal}
          coups={senegalStats.coups}
          yearsOfWar={senegalStats.yearsOfWar}
          tone="continuity"
        />
        <PathColumn
          path={independenceFork.guinea}
          coups={guineaStats.coups}
          yearsOfWar={guineaStats.yearsOfWar}
          tone="rupture"
        />
      </div>

      <p className="text-xs text-ink/55 max-w-3xl">
        Outcome metrics: CAM coups dataset; UCDP conflict years (1989–2024, ≥
        25 battle deaths). The fork does not explain everything — but it frames
        which institutional legacies Senegal carried forward and Guinea did not.
      </p>
    </figure>
  );
}
