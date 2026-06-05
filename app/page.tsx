import Link from "next/link";
import { StabilityOutlierChart } from "@/components/charts/StabilityOutlierChart";
import { ProgressFrame } from "@/components/ProgressFrame";
import { MethodologyNote } from "@/components/MethodologyNote";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { ContributionBox } from "@/components/ContributionBox";
import { ContinuityIndex } from "@/components/ContinuityIndex";
import { EvidenceWeighting } from "@/components/EvidenceWeighting";
import {
  researchQuestion,
  stakes,
  mainArgument,
  progressLens,
  counterpoints,
  takeaway,
  readingPath,
} from "@/lib/data/narrative";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative max-w-4xl space-y-8">
        <div className="absolute -left-6 top-0 bottom-0 w-1 rounded-full bg-rust/30" aria-hidden />
        <p className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          ECON 30 Capstone · Progress &amp; Inequality · Spring 2026
        </p>
        <ExecutiveSummary />
        <div>
          <p className="act-label mb-4">Act I · The divergence</p>
          <p className="prose-serif text-xl text-ink/90 mb-6 leading-relaxed max-w-3xl">
            {stakes}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.08] text-ink mb-5">
            {researchQuestion}
          </h2>
          <p className="prose-serif text-ink/80 max-w-3xl">
            Same empire, same decade — different outcomes. The chart and continuity
            index below quantify and code that gap; the rest of the site asks why.
          </p>
        </div>
      </section>

      <ContributionBox />

      <section className="space-y-4" id="outlier">
        <p className="act-label">Act II · The evidence</p>
        <StabilityOutlierChart />
        <MethodologyNote />
      </section>

      <ContinuityIndex />

      <EvidenceWeighting />

      <section className="max-w-3xl border border-ink/15 bg-parchment/50 p-6 md:p-8 space-y-3">
        <div className="text-xs uppercase tracking-[0.2em] text-rust">
          Argument
        </div>
        <p className="text-sm text-ink/80 leading-relaxed">{mainArgument.claim}</p>
        <p className="text-sm text-ink/70 leading-relaxed italic border-t border-ink/10 pt-4">
          Mechanism: {mainArgument.mechanism}
        </p>
      </section>

      <section className="space-y-6 max-w-4xl">
        <p className="act-label">Act III · Progress &amp; inequality</p>
        <h3 className="font-serif text-3xl text-ink">{progressLens.title}</h3>
        <ProgressFrame />
      </section>

      <div className="divider-rule" />

      <section className="space-y-6">
        <h3 className="font-serif text-3xl text-ink">How to read this site</h3>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
          {readingPath.map((step) => (
            <li key={step.step}>
              <Link
                href={step.href}
                className="block h-full border border-ink/15 bg-parchment/40 p-4 hover:border-rust transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                <div className="font-serif text-3xl text-rust mb-1">{step.step}</div>
                <div className="font-serif text-lg text-ink mb-1">{step.title}</div>
                <p className="text-xs text-ink/65">{step.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="limits" className="space-y-4 max-w-3xl">
        <h3 className="font-serif text-3xl text-ink">Limits &amp; counterpoints</h3>
        <ul className="space-y-3">
          {counterpoints.map((c) => (
            <li key={c.title} className="border border-ink/10 bg-parchment/30 p-4">
              <div className="font-medium text-ink text-sm">{c.title}</div>
              <p className="text-sm text-ink/70 mt-1">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="takeaway"
        className="border border-ink/15 bg-parchment/60 p-8 md:p-10 max-w-3xl text-center mx-auto"
      >
        <div className="text-xs uppercase tracking-[0.25em] text-rust mb-3">
          Remember one line
        </div>
        <p className="font-serif text-2xl md:text-3xl text-ink leading-snug">
          {takeaway}
        </p>
      </section>

      <section className="max-w-3xl space-y-2 text-sm text-ink/60">
        <h3 className="font-serif text-xl text-ink">About this project</h3>
        <p>
          Built for ECON 30 at Stanford. One comparative question — not a survey
          of all Senegalese history. Data: V-Dem, UCDP, CAM coups dataset.{" "}
          <Link href="/works-cited" className="text-rust underline hover:text-ink">
            Works cited →
          </Link>
        </p>
        <Link
          href="/government"
          className="inline-block text-xs uppercase tracking-[0.25em] text-rust hover:text-ink pt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          Continue to the full evidence →
        </Link>
      </section>
    </div>
  );
}
