const sections = [
  { id: "colonial", label: "Colonial rule" },
  { id: "transition", label: "Independence arc" },
  { id: "democracy", label: "Democracy index" },
  { id: "post-independence", label: "After 1960" },
  { id: "violence", label: "Violence" },
  { id: "compare", label: "Regional compare" },
  { id: "hypotheses", label: "Hypotheses" },
];

export function GovernmentToc() {
  return (
    <nav
      aria-label="On this page"
      className="lg:sticky lg:top-28 lg:self-start border border-ink/15 bg-parchment/50 p-4 mb-4 lg:mb-0"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-rust mb-3">
        On this page
      </p>
      <ol className="space-y-1.5 text-sm">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-ink/70 hover:text-rust transition-colors duration-75"
            >
              <span className="text-ink/40 mr-1.5">{index + 1}.</span>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
