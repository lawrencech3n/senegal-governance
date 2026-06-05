import { regionalComparison } from "@/lib/data/government";
import {
  independenceFork,
  type ForkTone,
  type IndependencePath,
} from "@/lib/data/culture";

const toneStyles: Record<
  ForkTone,
  { accent: string; dot: string; badge: string }
> = {
  continuity: {
    accent: "border-sage bg-parchment/60",
    dot: "bg-sage",
    badge: "bg-sage text-parchment",
  },
  rupture: {
    accent: "border-rust/40 bg-parchment/40",
    dot: "bg-rust",
    badge: "bg-rust text-parchment",
  },
  other: {
    accent: "border-ochre/50 bg-parchment/35",
    dot: "bg-ochre",
    badge: "bg-ink/70 text-parchment",
  },
};

function PathColumn({
  path,
  coups,
  yearsOfWar,
  highlight,
}: {
  path: IndependencePath;
  coups: number;
  yearsOfWar: number;
  highlight?: boolean;
}) {
  const style = toneStyles[path.tone];

  return (
    <article
      className={`border ${style.accent} p-4 md:p-5 space-y-4 h-full ${
        highlight ? "ring-2 ring-oxblood/20" : ""
      }`}
    >
      <header className="space-y-2">
        <h4 className="font-serif text-xl text-ink">{path.country}</h4>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[0.65rem] uppercase tracking-[0.15em] px-2 py-1 ${style.badge}`}
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
            className={`relative pl-5 pb-4 ${
              index < path.steps.length - 1
                ? "border-l border-ink/15 ml-1.5"
                : ""
            }`}
          >
            <span
              className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border border-ink/20 ${style.dot}`}
              aria-hidden
            />
            <div className="text-[0.65rem] uppercase tracking-[0.12em] text-rust mb-0.5">
              {step.year}
            </div>
            <div className="font-medium text-ink text-sm">{step.label}</div>
            <p className="text-xs text-ink/70 leading-relaxed mt-1">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <footer className="border-t border-ink/10 pt-3 grid grid-cols-2 gap-2">
        <div>
          <div className="text-[0.65rem] uppercase tracking-[0.12em] text-ink/50 mb-0.5">
            Coups since 1960
          </div>
          <div className="font-serif text-2xl text-ink leading-none">
            {coups}
          </div>
        </div>
        <div>
          <div className="text-[0.65rem] uppercase tracking-[0.12em] text-ink/50 mb-0.5">
            Conflict years
          </div>
          <div className="font-serif text-2xl text-ink leading-none">
            {yearsOfWar}
          </div>
        </div>
      </footer>
    </article>
  );
}

export function IndependenceForkDiagram() {
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

      <div className="border border-ink/20 bg-parchment px-4 py-3 text-center max-w-lg mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
          {independenceFork.referendum.year}
        </div>
        <div className="font-serif text-lg text-ink">
          {independenceFork.referendum.label}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {independenceFork.paths.map((path) => {
          const stats = regionalComparison.find(
            (c) => c.country === path.country,
          )!;
          return (
            <PathColumn
              key={path.country}
              path={path}
              coups={stats.coups}
              yearsOfWar={stats.yearsOfWar}
              highlight={path.country === "Senegal"}
            />
          );
        })}
      </div>

      <p className="text-xs text-ink/55 max-w-3xl">
        Outcome metrics: CAM coups dataset; UCDP conflict years (1989–2024, ≥
        25 battle deaths). A yes vote in 1958 did not guarantee stability —
        Mauritania and Burkina Faso show that inherited institutions and military
        politics still diverged. Senegal&apos;s distinction is the combination of
        yes vote, AOF capital, and elite continuity.
      </p>
    </figure>
  );
}
