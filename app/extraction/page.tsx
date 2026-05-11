import { ExtractionChart } from "@/components/charts/ExtractionChart";
import { DestinationChart } from "@/components/charts/DestinationChart";
import { majorOperators } from "@/lib/data/extraction";

export default function ExtractionPage() {
  return (
    <div className="space-y-16">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Section 02
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Extraction</h2>
        <p className="prose-serif text-ink/80">
          The chart below uses World Bank trade series to show how Senegal’s
          merchandise exports are composed. It’s not a full accounting of
          “extraction,” but it does make the basic structure visible: what
          kinds of goods dominate, and how that mix shifts over time.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Merchandise exports by category, 1962–2024
        </h3>
        <ExtractionChart />
        <p className="text-sm text-ink/60 max-w-3xl">
          Stacked bars decompose total merchandise exports into fuels, ores & metals,
          food, and agricultural raw materials (USD, current). Source: World Bank
          indicators for merchandise exports and export composition.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">What is exported?</h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          This snapshot shows the same merchandise export categories for 2020.
          It’s a coarse taxonomy, but it helps anchor the narrative in a
          consistent, internationally comparable dataset.
        </p>
        <DestinationChart />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">Who is doing the extracting?</h3>
        <div className="border border-ink/15">
          <table className="w-full text-sm">
            <thead className="bg-ink text-parchment">
              <tr>
                <th className="text-left p-3 font-serif text-base font-medium">Operator</th>
                <th className="text-left p-3 font-serif text-base font-medium">Origin</th>
                <th className="text-left p-3 font-serif text-base font-medium">Resource</th>
                <th className="text-left p-3 font-serif text-base font-medium">Era</th>
                <th className="text-left p-3 font-serif text-base font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {majorOperators.map((op, i) => (
                <tr
                  key={op.name}
                  className={i % 2 === 0 ? "bg-parchment/40" : "bg-parchment/70"}
                >
                  <td className="p-3 font-medium text-ink">{op.name}</td>
                  <td className="p-3 text-ink/70">{op.origin}</td>
                  <td className="p-3 text-ink/70">{op.resource}</td>
                  <td className="p-3 text-ink/70">{op.era}</td>
                  <td className="p-3 text-ink/70 max-w-md">{op.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink/60 max-w-3xl">
          A pattern: French firms dominated until the 1990s, when partial
          privatizations and structural-adjustment-era reforms broadened the
          ownership pool. The buyers diversified faster than the
          extractive logic itself.
        </p>
      </section>
    </div>
  );
}
