import { RegimeChart } from "@/components/charts/RegimeChart";
import { RegionalCompareChart } from "@/components/charts/RegionalCompareChart";
import {
  senegalRegimes,
  conflicts,
  governanceHypotheses,
} from "@/lib/data/government";

export default function GovernmentPage() {
  const colonial = senegalRegimes.filter((r) => r.type === "colonial");
  const postcolonial = senegalRegimes.filter((r) => r.type !== "colonial");

  return (
    <div className="space-y-16">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Core section
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Governance</h2>
        <p className="prose-serif text-ink/80">
          France ruled Senegal for three centuries and administered much of
          French West Africa from Dakar. Independence in 1960 changed the flag
          more than it reset the state. The question this section pursues is
          comparative: why has political instability — coups, civil war, state
          fracture — been rarer here than next door?
        </p>
      </header>

      <section className="border-l-4 border-rust pl-6 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-ink/60 mb-2">
          Research question
        </div>
        <p className="font-serif text-2xl text-ink leading-snug">
          Why didn&apos;t Senegal experience as much political instability as
          neighboring countries?
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Under French colonial rule
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Colonial governance was neither uniform nor purely extractive in the
          Senegalese case. Four communes in the Cape Verde peninsula had
          assimilationist rights; the interior was governed through indigénat.
          Dakar&apos;s prominence in the{" "}
          <em>fédération</em> meant a deeper administrative footprint than in
          many neighboring territories — courts, schools, parties, and a
          Francophone elite ready to inherit the apparatus.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
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

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Democratic deepening (and its limits)
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          V-Dem&apos;s liberal democracy index rises after independence, dips
          during authoritarian phases, and recovers with elections — but never
          reaches Western European levels. Colonial-era values are model-based;
          post-1960 trends are more reliable.
        </p>
        <RegimeChart />
        <p className="text-sm text-ink/60 max-w-3xl">
          Source: V-Dem via Our World in Data. Shaded band: colonial period
          (approx. 1895–1960).
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">After independence</h3>
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

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Violence — present, but contained
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Senegal is not conflict-free. Casamance, border clashes with
          Mauritania, and recent urban protests show real instability. The
          comparison is relative: neighbors have faced full-scale civil wars
          and serial coups; Senegal has not.
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
                <div className="font-medium text-ink">{c.name}</div>
                <div className="text-sm text-ink/70">{c.note}</div>
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
          Compared to neighbors
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Senegal in dark red. Successful coups since 1960 and years with
          UCDP-classified organized violence (1989–2024). The Gambia also has
          zero coups in this dataset but a different scale and history; Mali
          and Burkina Faso illustrate how violent the regional baseline can be.
        </p>
        <RegionalCompareChart />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Competing explanations
        </h3>
        <p className="prose-serif text-ink/80 max-w-3xl mb-2">
          No single factor wins in the literature. These are the arguments the
          project is built to evaluate — not to prove.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {governanceHypotheses.map((h) => (
            <article
              key={h.title}
              className="border border-ink/15 bg-parchment/50 p-5"
            >
              <h4 className="font-serif text-xl text-ink mb-2">{h.title}</h4>
              <p className="text-sm text-ink/80 leading-relaxed">{h.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
