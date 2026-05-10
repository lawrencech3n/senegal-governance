import { RegimeChart } from "@/components/charts/RegimeChart";
import { RegionalCompareChart } from "@/components/charts/RegionalCompareChart";
import { senegalRegimes, conflicts } from "@/lib/data/government";

export default function GovernmentPage() {
  return (
    <div className="space-y-16">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Section 04
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Government</h2>
        <p className="prose-serif text-ink/80">
          France gave up Senegal on 4 April 1960. What it left behind was an
          administrative state, a legal system, and a Francophone elite.
          Senegal&apos;s post-colonial story has been unusually peaceful by
          regional standards: no successful coup, three peaceful
          alternations, slow democratic deepening. It has also been
          unusually entwined with Paris.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Regimes since 1895
        </h3>
        <RegimeChart />
        <p className="text-sm text-ink/60 max-w-3xl">
          V-Dem&apos;s liberal democracy index, 0–1. Approximate values
          drawn from the V-Dem dataset; colonial-era values are nominal.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">The leaders</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {senegalRegimes
            .filter((r) => r.type !== "colonial")
            .map((r) => (
              <div key={r.leader} className="border border-ink/15 bg-parchment/50 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
                  {r.start}–{r.end}
                </div>
                <h4 className="font-serif text-2xl text-ink">{r.leader}</h4>
                <div className="text-xs text-ink/60 mb-2 capitalize">{r.type.replace("-", " ")}</div>
                <p className="text-sm text-ink/80 leading-relaxed">{r.note}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">Wars and unrest</h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          By the standards of post-colonial West Africa, Senegal has been a
          quiet country. The Casamance separatist conflict — Africa&apos;s
          longest-running low-intensity insurgency — and tensions with
          Mauritania account for most of the violence.
        </p>
        <ul className="space-y-2 max-w-3xl">
          {conflicts.map((c) => (
            <li key={c.year + c.name} className="flex gap-4 border-b border-ink/10 pb-2">
              <span className="font-serif text-2xl text-rust min-w-[4ch]">{c.year}</span>
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

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">Compared to its neighbors</h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          Senegal in red. Most of its peers, who were given independence the
          same year, have far more turbulent records. The reasons are
          contested — relative ethnic homogeneity, the Sufi brotherhoods&apos;
          stabilizing role, Senghor&apos;s personal restraint, the
          continuity of French security guarantees — but the contrast is
          striking.
        </p>
        <RegionalCompareChart />
      </section>
    </div>
  );
}
