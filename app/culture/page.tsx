import type { Metadata } from "next";
import { cultureThemes } from "@/lib/data/culture";
import { PageSynthesis } from "@/components/PageSynthesis";
import { IndependenceForkDiagram } from "@/components/IndependenceForkDiagram";
import { WestAfricaMap } from "@/components/WestAfricaMap";
import { progressLens } from "@/lib/data/narrative";

export const metadata: Metadata = {
  title: "Institutional Legacies",
  description:
    "Colonial and post-colonial institutions — indigénat, the CFA franc, and Françafrique — that shaped Senegal after independence.",
};

export default function CulturePage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Supporting argument
        </p>
        <h2 className="font-serif text-5xl text-ink mb-4">
          Institutional legacies
        </h2>
        <p className="prose-serif text-ink/80">
          Stability is not only elections and coups. Colonial and post-colonial
          institutions — legal categories, currency, security pacts — shaped who
          could rule and how challengers were absorbed or suppressed. These
          legacies help explain why independence did not produce the same ruptures
          as in Mali or Guinea.
        </p>
      </header>

      <IndependenceForkDiagram />

      <WestAfricaMap />

      <section className="grid sm:grid-cols-2 gap-4 max-w-4xl">
        <article className="border border-ink/15 bg-parchment/40 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
            Progress bottleneck
          </div>
          <p className="text-sm text-ink/80 leading-relaxed">
            {progressLens.bottleneck}
          </p>
        </article>
        <article className="border border-ink/15 bg-parchment/40 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
            Uneven gains
          </div>
          <p className="text-sm text-ink/80 leading-relaxed">
            {progressLens.whoGains}
          </p>
        </article>
      </section>

      <section className="space-y-6">
        {cultureThemes.map((t, i) => (
          <article
            key={t.title}
            className={`grid md:grid-cols-[180px_1fr] gap-6 py-6 ${
              i !== 0 ? "border-t border-ink/15" : ""
            }`}
          >
            <div className="md:text-right">
              <div className="text-xs uppercase tracking-[0.2em] text-rust">
                {t.era}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-3xl text-ink mb-2">{t.title}</h3>
              <p className="prose-serif text-ink/80 max-w-2xl">{t.body}</p>
            </div>
          </article>
        ))}
      </section>

      <PageSynthesis>
        The CFA franc and Françafrique ties are the hardest legacies to
        quantify — but they matter for progress because they bound monetary and
        security choices long after independence. That continuity may have
        discouraged coups while also limiting policy autonomy.
      </PageSynthesis>

      <section className="border-l-4 border-rust pl-6 max-w-3xl">
        <p className="prose-serif italic text-ink/80">
          &ldquo;The colonial bourgeoisie&hellip; identifies itself with the Western
          bourgeoisie, from whom it has learnt its lessons.&rdquo;
        </p>
        <p className="text-sm text-ink/60 mt-2">
          — Frantz Fanon, <em>The Wretched of the Earth</em>, 1961
        </p>
      </section>
    </div>
  );
}
