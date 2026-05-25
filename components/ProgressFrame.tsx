import { progressLens } from "@/lib/data/narrative";

export function ProgressFrame() {
  const items = [
    { label: "Bottleneck removed", value: progressLens.bottleneck },
    { label: "Partial engine", value: progressLens.engine },
    { label: "Who gains", value: progressLens.whoGains },
    { label: "What we learn", value: progressLens.futureLearning },
  ];

  return (
    <section className="grid sm:grid-cols-2 gap-4" aria-labelledby="progress-frame-heading">
      <h3 id="progress-frame-heading" className="sr-only">
        Progress studies lens
      </h3>
      {items.map((item, i) => (
        <article
          key={item.label}
          className="border border-ink/15 bg-parchment/40 p-5 relative overflow-hidden"
        >
          <span
            className="absolute top-3 right-4 font-serif text-4xl text-ink/5 select-none"
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="text-xs uppercase tracking-[0.2em] text-rust mb-2">
            {item.label}
          </div>
          <p className="text-sm text-ink/80 leading-relaxed">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
