import { originalInsight } from "@/lib/data/narrative";

export function ContributionBox() {
  return (
    <section
      id="contribution"
      aria-labelledby="contribution-heading"
      className="border-l-4 border-oxblood pl-6 max-w-4xl space-y-4"
    >
      <h3 id="contribution-heading" className="font-serif text-2xl text-ink">
        {originalInsight.title}
      </h3>
      <p className="text-sm text-ink/80 leading-relaxed max-w-3xl">
        {originalInsight.body}
      </p>
      <ul className="grid sm:grid-cols-2 gap-3 list-none">
        {originalInsight.bullets.map((bullet) => (
          <li
            key={bullet.slice(0, 32)}
            className="text-sm text-ink/75 leading-relaxed border border-ink/10 bg-parchment/40 px-4 py-3"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  );
}
