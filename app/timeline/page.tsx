import { Timeline } from "@/components/Timeline";

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
          of the 21st century. Use the category filters: Colonization for
          imperial rule, Politics for the transition to self-government.
        </p>
      </header>

      <Timeline />
    </div>
  );
}
