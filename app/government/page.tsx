import Link from "next/link";
import type { Metadata } from "next";
import { RegimeChart } from "@/components/charts/RegimeChart";
import { RegionalCompareChart } from "@/components/charts/RegionalCompareChart";
import { ColonialTransitionDiagram } from "@/components/ColonialTransitionDiagram";
import { HypothesisExplorer } from "@/components/HypothesisExplorer";
import { PageSynthesis } from "@/components/PageSynthesis";
import { GovernmentToc } from "@/components/GovernmentToc";
import { MethodologyNote } from "@/components/MethodologyNote";
import { conflicts } from "@/lib/data/government";
import { colonialHistory } from "@/lib/data/colonial";
import {
  mainArgument,
  researchQuestion,
  authorSynthesis,
  takeaway,
} from "@/lib/data/narrative";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "Colonial rule, negotiated independence, democracy index, regional coup and conflict comparison, and competing explanations for Senegal's stability.",
};

export default function GovernmentPage() {
  return (
    <div className="lg:grid lg:grid-cols-[11rem_1fr] lg:gap-10">
      <GovernmentToc />
      <div className="space-y-14 min-w-0">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-rust">
            Section 1 · Evidence
          </p>
          <h2 className="font-serif text-5xl text-ink">Governance</h2>
          <p className="font-serif text-xl text-ink leading-snug">
            {researchQuestion}
          </p>
          <p className="prose-serif text-ink/80">{mainArgument.claim}</p>
        </header>

        <section className="space-y-4" id="colonial">
          <h3 className="font-serif text-3xl text-ink">
            1. Under French colonial rule
          </h3>
          <p className="prose-serif text-ink/80 max-w-3xl">
            Four communes had assimilationist rights from 1848; the interior was
            governed through indigénat from 1887. Dakar&apos;s role as AOF capital
            meant a deeper administrative footprint than in Bamako or Conakry — a
            Francophone elite ready to inherit the apparatus when France withdrew.
          </p>
          <ul className="space-y-2 max-w-3xl text-sm text-ink/75">
            {colonialHistory.slice(0, 4).map((m) => (
              <li key={m.year + m.title} className="flex gap-3 border-b border-ink/10 pb-2">
                <span className="font-serif text-rust min-w-[4ch]">{m.year}</span>
                <span>
                  <strong className="font-medium text-ink">{m.title}.</strong>{" "}
                  {m.body}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink/60">
            Full colonial sequence:{" "}
            <Link href="/timeline" className="text-rust underline hover:text-ink">
              timeline → Colonial arc
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4" id="transition">
          <h3 className="font-serif text-3xl text-ink">
            2. From colony to republic (1945–1963)
          </h3>
          <p className="prose-serif text-ink/80 max-w-3xl">
            Senegal expanded citizenship, won territorial autonomy, and voted 97.8%
            yes on the 1958 French Community — choosing negotiated exit over
            Guinea&apos;s rupture. Senghor and Lamine Guèye fought to control the
            inherited state rather than destroy it.
          </p>
          <ColonialTransitionDiagram />
          <p className="text-sm text-ink/60 max-w-3xl">
            Walk the full sequence on the{" "}
            <Link href="/timeline" className="text-rust underline hover:text-ink">
              Independence arc timeline
            </Link>
            ; compare Senegal vs. Guinea at the{" "}
            <Link href="/culture#fork" className="text-rust underline hover:text-ink">
              1958 fork
            </Link>
            ; locate peers on the{" "}
            <Link href="/#map" className="text-rust underline hover:text-ink">
              regional map
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4" id="democracy">
          <h3 className="font-serif text-3xl text-ink">
            3. Democratic deepening (and its limits)
          </h3>
          <p className="prose-serif text-ink/80 max-w-3xl">
            Senegal&apos;s V-Dem score rises after independence and survives
            alternations — but never reaches Western European levels.
          </p>
          <RegimeChart />
          <p className="text-sm text-ink/60 max-w-3xl">
            Source: V-Dem via Our World in Data. Shaded band: colonial period
            (approx. 1895–1960).
          </p>
        </section>

        <section className="space-y-4" id="violence">
          <h3 className="font-serif text-3xl text-ink">
            4. Violence — present, but contained
          </h3>
          <p className="prose-serif text-ink/80 max-w-3xl">
            The comparison is relative: neighbors faced civil wars and serial coups;
            Senegal has not — except in Casamance.
          </p>
          <ul className="space-y-2 max-w-3xl">
            {conflicts.map((c) => (
              <li
                key={c.year + c.name}
                className="flex gap-4 border-b border-ink/10 pb-2 text-sm"
              >
                <span className="font-serif text-xl text-rust min-w-[4ch]">
                  {c.year}
                </span>
                <div>
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-ink/70">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4" id="compare">
          <h3 className="font-serif text-3xl text-ink">
            5. Compared to neighbors
          </h3>
          <p className="prose-serif text-ink/80 max-w-3xl">
            Senegal (dark red) against peers on coups since 1960 and UCDP conflict
            years (1989–2024). Toggle the outlier view on the{" "}
            <Link href="/#outlier" className="text-rust underline hover:text-ink">
              overview
            </Link>
            .
          </p>
          <RegionalCompareChart />
          <MethodologyNote />
        </section>

        <section className="space-y-4" id="hypotheses">
          <h3 className="font-serif text-3xl text-ink">
            6. Competing explanations
          </h3>
          <p className="prose-serif text-ink/80 max-w-3xl mb-2">
            Select a hypothesis to see what evidence this project brings to bear.
            No single factor wins in the literature.
          </p>
          <HypothesisExplorer />
        </section>

        <PageSynthesis>{authorSynthesis}</PageSynthesis>

        <section className="border-l-4 border-ochre pl-6 max-w-3xl py-2">
          <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
            Takeaway
          </div>
          <p className="font-serif text-xl text-ink leading-snug">{takeaway}</p>
          <p className="text-sm text-ink/60 mt-3">
            Limits and counterpoints:{" "}
            <Link href="/#limits" className="text-rust underline hover:text-ink">
              overview →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
