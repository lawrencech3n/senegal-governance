import Link from "next/link";

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
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Senegal · colonial rule → independence → today
        </div>
        <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink mb-6">
          Why didn&apos;t Senegal experience as much political instability as
          neighboring countries?
        </h2>
        <p className="prose-serif text-ink/80">
          Mali, Guinea, Burkina Faso, and Mauritania have seen repeated coups,
          civil wars, or state collapse. Senegal — independent the same year,
          under the same colonial power — has had no successful military coup,
          three peaceful transfers of power at the ballot box, and only one
          major low-intensity conflict (Casamance). This project traces{" "}
          <strong className="font-medium text-ink">governance</strong> under
          French rule and after independence, then tests the usual explanations
          against data.
        </p>
      </section>

      <section className="border border-ink/15 bg-parchment/50 p-6 md:p-8 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
          Research question
        </div>
        <p className="font-serif text-2xl text-ink leading-snug">
          Why didn&apos;t Senegal experience as much political instability as
          neighboring countries?
        </p>
        <p className="text-sm text-ink/70 mt-4 leading-relaxed">
          The site does not claim a single answer. It maps colonial and
          post-colonial institutions, compares Senegal to peer states on coups
          and armed conflict, and lays out hypotheses scholars and policymakers
          debate — from Sufi mediation and ethnic structure to French security
          ties and elite-managed pluralism.
        </p>
        <Link
          href="/government"
          className="inline-block mt-5 text-xs uppercase tracking-[0.25em] text-rust hover:text-ink transition-colors"
        >
          Start with governance →
        </Link>
      </section>

      <div className="divider-rule" />

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

      <section className="max-w-3xl space-y-4 text-ink/70">
        <h3 className="font-serif text-2xl text-ink">Method</h3>
        <p className="prose-serif">
          Coup counts come from the CAM dataset; years with organized armed
          conflict from UCDP via Our World in Data; democratic deepening from
          V-Dem. Colonial narrative draws on standard histories of AOF and
          Senegalese party politics. Figures are for exploration, not
          peer-reviewed claims.
        </p>
      </section>
    </div>
  );
}
