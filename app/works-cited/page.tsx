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
    title: "World Development Indicators",
    publisher: "The World Bank",
    year: "1960–2024",
    url: "https://data.worldbank.org/country/senegal",
    note: "GDP, GNI per capita, sectoral shares, and exchange-rate series for Senegal.",
  },
  {
    title: "Mineral Yearbook — Senegal Chapters",
    publisher: "U.S. Geological Survey",
    year: "1994–2022",
    url: "https://www.usgs.gov/centers/national-minerals-information-center/africa-and-middle-east",
    note: "Annual production figures for phosphate, gold, zircon, ilmenite, and other minerals.",
  },
  {
    title: "UN Comtrade Database",
    publisher: "United Nations Statistics Division",
    year: "1962–2024",
    url: "https://comtradeplus.un.org/",
    note: "Bilateral trade flows used to chart export destinations and product mix.",
  },
  {
    title: "Observatory of Economic Complexity (OEC)",
    author: "Alexander Simoes & César Hidalgo",
    publisher: "Datawheel / MIT Media Lab",
    year: "2024",
    url: "https://oec.world/en/profile/country/sen",
    note: "Visualized export composition and trade-partner shares for Senegal.",
  },
  {
    title: "V-Dem Dataset, v14",
    author: "Coppedge, Michael, et al.",
    publisher: "Varieties of Democracy Institute, University of Gothenburg",
    year: "2024",
    url: "https://v-dem.net/data/the-v-dem-dataset/",
    note: "Liberal Democracy Index series used in the Government section.",
  },
  {
    title: "UCDP Georeferenced Event Dataset (GED) & Conflict Encyclopedia",
    publisher: "Uppsala Conflict Data Program, Uppsala University",
    year: "2024",
    url: "https://ucdp.uu.se/country/433",
    note: "Casamance conflict episodes and regional comparison data.",
  },
  {
    title: "Global Forest Resources Assessment",
    publisher: "Food and Agriculture Organization of the United Nations (FAO)",
    year: "2020",
    url: "https://www.fao.org/forest-resources-assessment/",
    note: "Forest cover trajectory used in the Environment section.",
  },
  {
    title: "SoilGrids — Global Gridded Soil Information",
    publisher: "ISRIC — World Soil Information",
    year: "2023",
    url: "https://soilgrids.org/",
    note: "Soil organic carbon and texture proxies for cropland degradation.",
  },
  {
    title: "Sea Around Us — Reconstructed Catch Data, Senegal EEZ",
    author: "Pauly, Daniel, and Dirk Zeller, eds.",
    publisher: "Sea Around Us, University of British Columbia",
    year: "2023",
    url: "https://www.seaaroundus.org/data/#/eez/686",
    note: "Reconstructed industrial and artisanal landings, 1950–present.",
  },
  {
    title: "Global Mangrove Watch",
    publisher: "Aberystwyth University, soloEO, Wetlands International, and partners",
    year: "2022",
    url: "https://www.globalmangrovewatch.org/",
    note: "Mangrove extent and loss, Saloum and Casamance deltas.",
  },
];

const books: Citation[] = [
  {
    author: "Fanon, Frantz",
    title: "The Wretched of the Earth",
    publisher: "Présence Africaine (orig.); Grove Press (Eng. trans. Constance Farrington, 1963)",
    year: "1961",
    note: "Quoted in the Culture section.",
  },
  {
    author: "Cooper, Frederick",
    title:
      "Decolonization and African Society: The Labor Question in French and British Africa",
    publisher: "Cambridge University Press",
    year: "1996",
  },
  {
    author: "Conklin, Alice L.",
    title:
      "A Mission to Civilize: The Republican Idea of Empire in France and West Africa, 1895–1930",
    publisher: "Stanford University Press",
    year: "1997",
  },
  {
    author: "Boone, Catherine",
    title: "Merchant Capital and the Roots of State Power in Senegal, 1930–1985",
    publisher: "Cambridge University Press",
    year: "1992",
  },
  {
    author: "Diouf, Mamadou",
    title: "Histoire du Sénégal: Le modèle islamo-wolof et ses périphéries",
    publisher: "Maisonneuve & Larose",
    year: "2001",
  },
  {
    author: "Pigeaud, Fanny, and Ndongo Samba Sylla",
    title:
      "Africa's Last Colonial Currency: The CFA Franc Story",
    publisher: "Pluto Press (Eng. trans. Thomas Fazi)",
    year: "2021",
    note: "Background for the CFA franc material in the Culture section.",
  },
  {
    author: "Verschave, François-Xavier",
    title: "La Françafrique: Le plus long scandale de la République",
    publisher: "Stock",
    year: "1998",
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
          Datasets, archives, and books that the figures and arguments
          throughout this project draw on. Where pre-1960 numbers required
          interpolation, the underlying series is still listed here; the
          interpretation is mine.
        </p>
      </header>

      <section className="space-y-6">
        <h3 className="font-serif text-3xl text-ink">Datasets &amp; Archives</h3>
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

      <div className="divider-rule" />

      <section className="max-w-3xl text-ink/70 prose-serif">
        <p>
          Web links were last checked on 10 May 2026. Where a printed source
          conflicted with a database figure, the database is preferred and the
          discrepancy is noted in the relevant section.
        </p>
      </section>
    </div>
  );
}
