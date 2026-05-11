import { EnvironmentChart } from "@/components/charts/EnvironmentChart";
import { environmentalImpacts } from "@/lib/data/environment";

export default function EnvironmentPage() {
  return (
    <div className="space-y-16">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Section 05
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Environment</h2>
        <p className="prose-serif text-ink/80">
          Extraction is rarely just a transfer of value. It is also a
          rearrangement of the land, the sea, and the soil. The four
          indicators below tell the story in aggregate: every one of them
          falls. Independence does not show up as a turning point.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">Since 1990</h3>
        <EnvironmentChart />
        <p className="text-sm text-ink/60 max-w-3xl">
          Each series indexed to its 1990 baseline. Sources: World Bank indicators
          derived from FAO (forest area % of land; fish capture production).
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">The damage, in detail</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {environmentalImpacts.map((imp) => (
            <article
              key={imp.title}
              className="border border-ink/15 bg-parchment/50 p-5"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-rust mb-1">
                {imp.driver}
              </div>
              <h4 className="font-serif text-2xl text-ink mb-2">{imp.title}</h4>
              <p className="text-sm text-ink/80 leading-relaxed">{imp.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
