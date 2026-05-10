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
          The first thing to notice about the chart below is not the size of
          the bars — it&apos;s their color. The dark portion is value leaving
          Senegal. Independence in 1960 didn&apos;t change the proportion as
          much as the textbook story implies. The local share has grown,
          slowly, but the resources still mostly travel.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">
          Annual extracted value, 1900–2024
        </h3>
        <ExtractionChart />
        <p className="text-sm text-ink/60 max-w-3xl">
          Bars stack value retained in Senegal (taxes, royalties, local
          wages) against value exported (sale value of resources flowing
          abroad, net of local retention). Pre-1960 figures are
          orders-of-magnitude estimates; the 1900–1940 entries reflect
          peanut and gum arabic exports valued in 2020 USD.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-3xl text-ink">Where does it go?</h3>
        <p className="prose-serif text-ink/80 max-w-3xl">
          The destinations have diversified since 1960 — France is no
          longer the single dominant buyer of any major resource — but the
          structure is recognizable: gold to Swiss refineries, fish to
          Spanish ports, phosphate to Indian fertilizer plants, mineral
          sands to Chinese smelters.
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
