import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";
import { PageSynthesis } from "@/components/PageSynthesis";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Interactive political history of Senegal from Saint-Louis through independence, alternations, and 21st-century stress tests.",
};

export default function TimelinePage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Political history
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Timeline</h2>
        <p className="prose-serif text-ink/80">
          Milestones in how Senegal was governed — from coastal trading posts
          through federation, the negotiated path to independence, and the tests
          of the 21st century. Start with the{" "}
          <strong className="font-medium text-ink">Independence arc</strong>{" "}
          preset to see the 1944–1963 sequence that distinguishes Senegal from
          Guinea&apos;s immediate rupture.
        </p>
      </header>

      <Timeline />

      <PageSynthesis>
        The timeline shows timing, not causation — but the clustering of
        political milestones between 1946 and 1960 supports the claim that
        Senegal exited through negotiation while peers inherited weaker centers
        or sharper military fractures.
      </PageSynthesis>
    </div>
  );
}
