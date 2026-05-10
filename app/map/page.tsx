import { SenegalMap } from "@/components/map/SenegalMap";

export default function MapPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Section 03
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Map</h2>
        <p className="prose-serif text-ink/80">
          Senegal is a country shaped by a river and a coastline. The wealth
          is concentrated where the colonial peanut railway met the sea —
          Dakar, Thiès, Saint-Louis. The mines are where they have always
          been: in the south-east, near the Falémé. Move the year slider to
          see when extraction sites came online and how income drifted.
        </p>
      </header>

      <SenegalMap />

      <section className="border-l-4 border-ochre pl-4 max-w-2xl text-sm text-ink/70">
        Note: regional income estimates interpolate linearly between 1960
        and 2020 anchors and so are illustrative, not precise. Region
        markers are sized by 2020 per-capita income; extraction-site dots
        appear in the year they came online.
      </section>
    </div>
  );
}
