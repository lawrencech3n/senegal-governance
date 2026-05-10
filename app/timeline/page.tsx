import { Timeline } from "@/components/Timeline";

export default function TimelinePage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">
          Section 01
        </div>
        <h2 className="font-serif text-5xl text-ink mb-4">Timeline</h2>
        <p className="prose-serif text-ink/80">
          Three centuries on a single track. Click any dot — or use the arrow
          buttons — to read the event. The colors mark the kind of moment:
          the conquest itself, the extraction it enabled, the politics that
          followed, the wars, and the long post-colonial drift.
        </p>
      </header>

      <Timeline />
    </div>
  );
}
