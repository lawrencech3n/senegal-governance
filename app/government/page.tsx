import Link from "next/link";
import { RegimeChart } from "@/components/charts/RegimeChart";
import { RegionalCompareChart } from "@/components/charts/RegionalCompareChart";
import { StabilityOutlierChart } from "@/components/charts/StabilityOutlierChart";
import { ColonialTransitionDiagram } from "@/components/ColonialTransitionDiagram";
import { HypothesisExplorer } from "@/components/HypothesisExplorer";
import { PageSynthesis } from "@/components/PageSynthesis";
import {
  senegalRegimes,
  conflicts,
} from "@/lib/data/government";
import { colonialHistory, independenceTransition } from "@/lib/data/colonial";
import {
  mainArgument,
  counterpoints,
  researchQuestion,
  authorSynthesis,
  takeaway,
} from "@/lib/data/narrative";

export default function GovernmentPage() {
  const colonial = senegalRegimes.filter((r) => r.type === "colonial");
  const postcolonial = senegalRegimes.filter((r) => r.type !== "colonial");

  return (
    <div className="space-y-16">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Section 1 · Evidence
        </p>
        <h2 className="font-serif text-5xl text-ink mb-4">Governance</h2>
        <p className="prose-serif text-ink/80">{mainArgument.claim}</p>
      </header>

      <section className="border-l-4 border-rust pl-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-2">
          Research question
        </p>
        <p className="font-serif text-2xl text-ink leading-snug">
          {researchQuestion}
        </p>
      </section>

      <section className="space-y-4" id="colonial">
        <h3 className="font-serif text-3xl text-ink">
          1. Under French colonial rule
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Colonial governance was neither uniform nor purely extractive in the
          Senegalese case. Four communes in the Cape Verde peninsula had
          assimilationist rights from 1848; the interior was governed through
          indigénat from 1887. Dakar&apos;s prominence in the{" "}
          <em>fédération</em> meant a deeper administrative footprint than in
          many neighboring territories — courts, schools, parties, and a
          Francophone elite ready to inherit the apparatus when France withdrew.
        </p>
        <div className="space-y-3 max-w-3xl">
          {colonialHistory.map((m) => (
            <article
              key={m.year + m.title}
              className="grid sm:grid-cols-[5rem_1fr] gap-3 border-b border-ink/10 pb-3"
            >
              <span className="font-serif text-2xl text-rust">{m.year}</span>
              <div>
                <h4 className="font-medium text-ink">{m.title}</h4>
                <p className="text-sm text-ink/75 leading-relaxed mt-1">
                  {m.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 pt-4">
          {colonial.map((r) => (
            <div key={r.leader} className="border border-ink/15 bg-parchment/50 p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
                {r.start}–{r.end}
              </div>
              <h4 className="font-serif text-2xl text-ink">{r.leader}</h4>
              <div className="text-xs text-ink/60 mb-2 capitalize">colonial</div>
              <p className="text-sm text-ink/80 leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" id="transition">
        <h3 className="font-serif text-3xl text-ink">
          2. From colony to republic (1945–1963)
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Senegal did not jump from empire to independence overnight. Between
          1946 and 1960, France expanded citizenship, granted territorial
          autonomy, and offered association in the French Community. Senegalese
          politicians — above all Senghor and Lamine Guèye — fought to control
          the inherited state rather than destroy it. That gradual, negotiated
          transfer helps explain why the army never seized power at independence,
          unlike in Mali or Congo.
        </p>
        <div className="space-y-3 max-w-3xl">
          {independenceTransition.map((m) => (
            <article
              key={m.year + m.title}
              className="grid sm:grid-cols-[5rem_1fr] gap-3 border-b border-ink/10 pb-3"
            >
              <span className="font-serif text-2xl text-rust">{m.year}</span>
              <div>
                <h4 className="font-medium text-ink">{m.title}</h4>
                <p className="text-sm text-ink/75 leading-relaxed mt-1">
                  {m.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="text-sm text-ink/60 max-w-3xl">
          See also the{" "}
          <Link href="/timeline" className="text-rust underline hover:text-ink">
            interactive timeline
          </Link>{" "}
          — filter by &ldquo;Independence arc&rdquo; for the 1945–1963 sequence.
        </p>
        <ColonialTransitionDiagram />
      </section>

      <section className="space-y-4" id="democracy">
        <h3 className="font-serif text-3xl text-ink">
          3. Democratic deepening (and its limits)
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          The chart below tracks liberal democracy (0 = none, 1 = full) from
          colonial era through today. The insight: Senegal&apos;s score rises
          after independence and survives alternations — but never reaches
          Western European levels, and recent years show backsliding under
          stress.
        </p>
        <RegimeChart />
        <p className="text-sm text-ink/60 max-w-3xl">
          Source: V-Dem via Our World in Data. Shaded band: colonial period
          (approx. 1895–1960). Vertical lines: independence (1960) and first
          alternation (2000).
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">4. After independence</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {postcolonial.map((r) => (
            <div key={r.leader} className="border border-ink/15 bg-parchment/50 p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
                {r.start}–{r.end}
              </div>
              <h4 className="font-serif text-2xl text-ink">{r.leader}</h4>
              <div className="text-xs text-ink/60 mb-2 capitalize">
                {r.type.replace("-", " ")}
              </div>
              <p className="text-sm text-ink/80 leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" id="violence">
        <h3 className="font-serif text-3xl text-ink">
          5. Violence — present, but contained
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Senegal is not conflict-free. The comparison is relative: neighbors
          have faced full-scale civil wars and serial coups; Senegal has not —
          except in Casamance, where regional grievances produced sustained
          insurgency.
        </p>
        <ul className="space-y-2 max-w-3xl">
          {conflicts.map((c) => (
            <li
              key={c.year + c.name}
              className="flex gap-4 border-b border-ink/10 pb-2"
            >
              <span className="font-serif text-2xl text-rust min-w-[4ch]">
                {c.year}
              </span>
              <div>
                <p className="font-medium text-ink">{c.name}</p>
                <p className="text-sm text-ink/70">{c.note}</p>
              </div>
              <span
                className={`ml-auto self-start text-xs uppercase tracking-[0.2em] px-2 py-1 ${
                  c.intensity === "high"
                    ? "bg-oxblood text-parchment"
                    : c.intensity === "medium"
                      ? "bg-rust text-parchment"
                      : "bg-ink/10 text-ink/70"
                }`}
              >
                {c.intensity}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4" id="compare">
        <h3 className="font-serif text-3xl text-ink">
          6. Compared to neighbors
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          The outlier chart quantifies the gap; the paired bars below show the
          same countries side by side. Senegal (dark red) against peer states on
          successful coups since 1960 and years with UCDP-classified organized
          violence (1989–2024).
        </p>
        <StabilityOutlierChart />
        <RegionalCompareChart />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          7. Competing explanations
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl mb-2">
          Use the explorer below to connect each hypothesis to evidence on this
          site. No single factor wins in the literature.
        </p>
        <HypothesisExplorer />
      </section>

      <PageSynthesis>{authorSynthesis}</PageSynthesis>

      <section className="border-l-4 border-ochre pl-6 max-w-3xl py-2">
        <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
          Takeaway
        </div>
        <p className="font-serif text-xl text-ink leading-snug">{takeaway}</p>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h3 className="font-serif text-3xl text-ink">Limits &amp; counterpoints</h3>
        <ul className="space-y-3">
          {counterpoints.map((c) => (
            <li key={c.title} className="border border-ink/10 p-4">
              <p className="font-medium text-ink text-sm">{c.title}</p>
              <p className="text-sm text-ink/70 mt-1">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
