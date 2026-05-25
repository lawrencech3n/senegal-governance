export function ColonialTransitionDiagram() {
  const phases = [
    { label: "Trading posts", years: "1659–1887", tone: "colonial" },
    { label: "Four communes + indigénat", years: "1848–1895", tone: "colonial" },
    { label: "AOF capital (Dakar)", years: "1895–1958", tone: "colonial" },
    { label: "Autonomy in French Community", years: "1958–1959", tone: "transition" },
    { label: "Independence", years: "1960", tone: "republic" },
    { label: "Alternations", years: "2000 · 2012 · 2024", tone: "republic" },
  ];

  return (
    <figure className="border border-ink/15 bg-parchment/40 p-6 overflow-x-auto">
      <figcaption className="font-serif text-lg text-ink mb-4">
        Colonial rule → negotiated exit → republic
      </figcaption>
      <svg
        viewBox="0 0 720 120"
        className="w-full min-w-[560px] h-auto"
        role="img"
        aria-label="Diagram showing phases from colonial trading posts through independence to peaceful alternations"
      >
        <line
          x1="0"
          y1="44"
          x2="720"
          y2="44"
          stroke="#1a1814"
          strokeOpacity={0.15}
          strokeWidth={2}
        />
        {phases.map((p, i) => {
          const x = 20 + i * 115;
          const fill =
            p.tone === "colonial"
              ? "#5c1a1a"
              : p.tone === "transition"
                ? "#c89c4a"
                : "#6a7d5e";
          return (
            <g key={p.label}>
              <circle cx={x + 40} cy={44} r={10} fill={fill} />
              {i < phases.length - 1 && (
                <line
                  x1={x + 50}
                  y1={44}
                  x2={x + 105}
                  y2={44}
                  stroke="#1a1814"
                  strokeOpacity={0.25}
                  strokeWidth={2}
                />
              )}
              <text
                x={x + 40}
                y={72}
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: 9, fontFamily: "Inter, sans-serif" }}
              >
                {p.years}
              </text>
              <text
                x={x + 40}
                y={88}
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: 8, fontFamily: "Inter, sans-serif", opacity: 0.75 }}
              >
                {p.label.length > 22 ? p.label.slice(0, 20) + "…" : p.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-xs text-ink/55 mt-3 max-w-2xl">
        The argument: Senegal inherited a functioning center (Dakar) and exited
        through negotiation — not rupture like Guinea (1958) or military
        takeover like Mali (1968).
      </p>
    </figure>
  );
}
