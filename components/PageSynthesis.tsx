import { researchQuestion } from "@/lib/data/narrative";

type PageSynthesisProps = {
  children: string;
};

export function PageSynthesis({ children }: PageSynthesisProps) {
  return (
    <section className="border-l-4 border-oxblood pl-6 max-w-3xl space-y-3 py-2">
      <div className="text-xs uppercase tracking-[0.2em] text-rust">
        Back to my question
      </div>
      <p className="font-serif text-lg text-ink/90 italic leading-snug">
        &ldquo;{researchQuestion}&rdquo;
      </p>
      <p className="text-sm text-ink/80 leading-relaxed">{children}</p>
    </section>
  );
}
