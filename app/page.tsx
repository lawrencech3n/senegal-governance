import Link from "next/link";

const sections = [
  {
    href: "/timeline",
    title: "Timeline",
    body: "Three centuries from Saint-Louis to the Faye administration. Scrub through the events that shape what comes after.",
  },
  {
    href: "/extraction",
    title: "Extraction",
    body: "How much left Senegal each year, where it went, and which companies took it. Peanuts, phosphates, gold, gas.",
  },
  {
    href: "/map",
    title: "Map",
    body: "An interactive map of the country. Pick a year, click a region, see where the mines are and what people earn.",
  },
  {
    href: "/government",
    title: "Government",
    body: "The regimes Senegal has had since 1960, the wars it has and hasn't fought, and how it compares to its neighbors.",
  },
  {
    href: "/environment",
    title: "Environment",
    body: "Soil, mangroves, fisheries, gold tailings. The ledger of what extraction left behind.",
  },
  {
    href: "/culture",
    title: "Culture",
    body: "Indigénat, the CFA franc, Françafrique, language, migration. The hard-to-quantify legacies.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Senegal · 1659 – 2026
        </div>
        <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink mb-6">
          What France took, and what it left behind.
        </h2>
        <p className="prose-serif text-ink/80">
          France granted Senegal independence on the 4th of April, 1960. The
          flag changed; the currency, the military bases, the company logos
          on the phosphate trains, and the destinations of the cargo ships
          mostly did not. This project tries to put numbers and faces to that
          continuity — and to ask, sixty-six years later, what changed and
          what didn&apos;t.
        </p>
      </section>

      <div className="divider-rule" />

      <section className="grid md:grid-cols-2 gap-8">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group border border-ink/15 bg-parchment/50 p-6 hover:border-rust transition-all duration-100 hover:bg-parchment"
          >
            <h3 className="font-serif text-3xl text-ink group-hover:text-rust transition-colors duration-75 mb-2">
              {s.title}
            </h3>
            <p className="text-ink/70 leading-relaxed">{s.body}</p>
            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-ink/50 group-hover:text-rust">
              Read →
            </div>
          </Link>
        ))}
      </section>

      <div className="divider-rule" />

      <section className="max-w-3xl space-y-4 text-ink/70">
        <h3 className="font-serif text-2xl text-ink">A note on sources.</h3>
        <p className="prose-serif">
          Pre-1960 figures are unavoidably rough. Colonial administrations
          recorded what suited them, in francs that were repeatedly
          redenominated. Post-1960 figures lean on the World Bank, USGS
          mineral yearbooks, OEC and UN Comtrade for trade flows, V-Dem for
          democratic indicators, and UCDP for conflict data. Where secondary
          literature is the best available source, it is cited inline.
        </p>
        <p className="prose-serif">
          This is a student project, not a peer-reviewed paper. Treat the
          numbers as orders of magnitude.
        </p>
      </section>
    </div>
  );
}
