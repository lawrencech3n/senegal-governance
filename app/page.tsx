import Link from "next/link";
import {
  researchQuestion,
  mainArgument,
  progressLens,
  counterpoints,
  takeaway,
  readingPath,
} from "@/lib/data/narrative";

const sections = [
  {
    href: "/government",
    title: "Governance",
    body: "Colonial administration, independence, post-colonial leaders, coups and conflict compared to neighbors — and competing explanations for Senegal's relative stability.",
  },
  {
    href: "/timeline",
    title: "Timeline",
    body: "From Saint-Louis to the Faye administration: the political milestones that shaped how Senegal was ruled before and after 1960.",
  },
  {
    href: "/culture",
    title: "Institutional legacies",
    body: "Indigénat, assimilation, the CFA franc, and Françafrique — the hard-to-measure structures that outlasted the flag change.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          ECON 30 Capstone · Progress &amp; Inequality · Spring 2026
        </p>
        <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink mb-6">
          {researchQuestion}
        </h2>
        <p className="prose-serif text-ink/80">
          Mali, Guinea, Burkina Faso, and Mauritania — independent the same
          decade, under the same colonial power — have seen repeated coups, civil
          wars, or state collapse. Senegal has had{" "}
          <strong className="font-medium text-ink">no successful military coup</strong>
          , three peaceful transfers of power at the ballot box, and one major
          low-intensity conflict (Casamance). This site asks why the paths
          diverged, and what that divergence means for long-run progress.
        </p>
      </section>

      <section className="border border-ink/15 bg-parchment/50 p-6 md:p-8 max-w-3xl space-y-4">
        <div className="text-xs uppercase tracking-[0.2em] text-rust">
          Research question
        </div>
        <p className="font-serif text-2xl text-ink leading-snug">
          {researchQuestion}
        </p>
        <div className="border-t border-ink/10 pt-4">
          <div className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-2">
            Argument (defensible, not proven)
          </div>
          <p className="text-sm text-ink/80 leading-relaxed">
            {mainArgument.claim}
          </p>
          <p className="text-sm text-ink/70 leading-relaxed mt-3 italic">
            Mechanism: {mainArgument.mechanism}
          </p>
        </div>
      </section>

      <section className="max-w-3xl space-y-4">
        <h3 className="font-serif text-3xl text-ink">{progressLens.title}</h3>
        {progressLens.paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="prose-serif text-ink/80">
            {p}
          </p>
        ))}
        <p className="text-sm border-l-4 border-ochre pl-4 text-ink/75">
          <span className="font-medium text-ink">Who gains: </span>
          {progressLens.whoGains}
        </p>
      </section>

      <div className="divider-rule" />

      <section className="space-y-6">
        <h3 className="font-serif text-3xl text-ink">How to read this site</h3>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
          {readingPath.map((step) => (
            <li key={step.step}>
              <Link
                href={step.href}
                className="block h-full border border-ink/15 bg-parchment/40 p-4 hover:border-rust transition"
              >
                <div className="font-serif text-3xl text-rust mb-1">
                  {step.step}
                </div>
                <div className="font-serif text-lg text-ink mb-1">
                  {step.title}
                </div>
                <p className="text-xs text-ink/65">{step.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group border border-ink/15 bg-parchment/50 p-6 hover:border-rust transition-all duration-100 hover:bg-parchment"
          >
            <h3 className="font-serif text-2xl text-ink group-hover:text-rust transition-colors duration-75 mb-2">
              {s.title}
            </h3>
            <p className="text-sm text-ink/70 leading-relaxed">{s.body}</p>
            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-ink/50 group-hover:text-rust">
              Read →
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-4 max-w-3xl">
        <h3 className="font-serif text-3xl text-ink">Limits &amp; counterpoints</h3>
        <p className="text-sm text-ink/70">
          A strong argument acknowledges what it cannot explain:
        </p>
        <ul className="space-y-3">
          {counterpoints.map((c) => (
            <li
              key={c.title}
              className="border border-ink/10 bg-parchment/30 p-4"
            >
              <div className="font-medium text-ink text-sm">{c.title}</div>
              <p className="text-sm text-ink/70 mt-1">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-l-4 border-oxblood pl-6 max-w-3xl py-2">
        <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
          Takeaway
        </div>
        <p className="font-serif text-2xl text-ink leading-snug">{takeaway}</p>
      </section>

      <section className="max-w-3xl space-y-2 text-sm text-ink/60">
        <h3 className="font-serif text-xl text-ink">About this project</h3>
        <p>
          Built for ECON 30 at Stanford. The interactive comparison charts and
          timeline are meant to test one comparative question — not to summarize
          all of Senegalese history. Data: V-Dem, UCDP, CAM coups dataset.
        </p>
        <Link
          href="/government"
          className="inline-block text-xs uppercase tracking-[0.25em] text-rust hover:text-ink pt-2"
        >
          Start with the evidence →
        </Link>
      </section>
    </div>
  );
}
