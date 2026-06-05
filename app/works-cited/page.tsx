import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works Cited",
  description:
    "Datasets and scholarship behind the Senegal governance comparison: V-Dem, UCDP, CAM coups dataset, and key books.",
};

type Citation = {
  title: string;
  author?: string;
  publisher: string;
  year?: string;
  url?: string;
  note?: string;
};

const datasets: Citation[] = [
  {
    title: "Liberal Democracy Index (V-Dem)",
    author: "Coppedge, Michael, et al.",
    publisher: "Our World in Data / V-Dem Institute",
    year: "2026",
    url: "https://ourworldindata.org/grapher/liberal-democracy-index",
    note: "Democratic deepening chart on the Governance page.",
  },
  {
    title: "Coup Agency and Mechanisms (CAM) Dataset",
    publisher: "militarycoups.org",
    url: "https://militarycoups.org/",
    note: "Successful coup counts since 1960 for regional comparison.",
  },
  {
    title: "Locations of ongoing armed conflicts (UCDP)",
    publisher: "Our World in Data / Uppsala Conflict Data Program",
    url: "https://ourworldindata.org/grapher/locations-of-ongoing-armed-conflicts",
    note: "Years with organized violence, 1989–2024, by country.",
  },
  {
    title: "UCDP Conflict Encyclopedia — Senegal",
    publisher: "Uppsala Conflict Data Program",
    url: "https://ucdp.uu.se/country/433",
    note: "Casamance and other conflict episodes.",
  },
];

const books: Citation[] = [
  {
    author: "Boone, Catherine",
    title: "Merchant Capital and the Roots of State Power in Senegal, 1930–1985",
    publisher: "Cambridge University Press",
    year: "1992",
  },
  {
    author: "Conklin, Alice L.",
    title:
      "A Mission to Civilize: The Republican Idea of Empire in France and West Africa, 1895–1930",
    publisher: "Stanford University Press",
    year: "1997",
  },
  {
    author: "Diouf, Mamadou",
    title: "Histoire du Sénégal: Le modèle islamo-wolof et ses périphéries",
    publisher: "Maisonneuve & Larose",
    year: "2001",
  },
  {
    author: "Pigeaud, Fanny, and Ndongo Samba Sylla",
    title: "Africa's Last Colonial Currency: The CFA Franc Story",
    publisher: "Pluto Press (Eng. trans. Thomas Fazi)",
    year: "2021",
  },
  {
    author: "Verschave, François-Xavier",
    title: "La Françafrique: Le plus long scandale de la République",
    publisher: "Stock",
    year: "1998",
  },
  {
    author: "Fanon, Frantz",
    title: "The Wretched of the Earth",
    publisher: "Présence Africaine (orig.); Grove Press (Eng. trans. Constance Farrington, 1963)",
    year: "1961",
  },
];

function CitationItem({ c }: { c: Citation }) {
  return (
    <li className="prose-serif text-ink/80">
      {c.author && <span>{c.author}. </span>}
      <em>{c.title}</em>
      {". "}
      <span>{c.publisher}</span>
      {c.year && <span>, {c.year}</span>}
      {"."}
      {c.url && (
        <>
          {" "}
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust hover:underline break-all"
          >
            {c.url}
          </a>
          .
        </>
      )}
      {c.note && (
        <span className="block text-sm text-ink/60 italic mt-1">{c.note}</span>
      )}
    </li>
  );
}

export default function WorksCitedPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Appendix
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Works Cited</h2>
        <p className="prose-serif text-ink/80">
          Sources for the governance comparison and institutional legacies.
          Interpretation and framing are the author&apos;s.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="font-serif text-3xl text-ink">Datasets</h3>
        <ol className="space-y-5 list-decimal pl-6 marker:text-ink/40">
          {datasets.map((c) => (
            <CitationItem key={c.title} c={c} />
          ))}
        </ol>
      </section>

      <div className="divider-rule" />

      <section className="space-y-6">
        <h3 className="font-serif text-3xl text-ink">Books &amp; Articles</h3>
        <ol className="space-y-5 list-decimal pl-6 marker:text-ink/40">
          {books.map((c) => (
            <CitationItem key={c.title} c={c} />
          ))}
        </ol>
      </section>
    </div>
  );
}