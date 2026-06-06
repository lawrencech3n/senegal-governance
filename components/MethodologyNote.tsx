export function MethodologyNote() {
  return (
    <aside className="border border-ink/15 bg-parchment/40 p-5 md:p-6 max-w-3xl text-sm text-ink/75 leading-relaxed space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-rust">
        Methodology
      </p>
      <p>
        <strong className="font-medium text-ink">Peer set:</strong> I compare
        Mali, Guinea, Guinea-Bissau, Mauritania, Burkina Faso, and The Gambia
        — Francophone West African states independent in the same decade under
        French rule. The Gambia is included despite structural differences (I
        note that as a counterpoint).
      </p>
      <p>
        <strong className="font-medium text-ink">Coups:</strong> successful
        military takeovers since 1960 (CAM dataset).{" "}
        <strong className="font-medium text-ink">Conflict years:</strong> years
        with UCDP-classified organized violence at ≥25 battle deaths
        (1989–2024).{" "}
        <strong className="font-medium text-ink">Democracy:</strong> V-Dem
        liberal democracy index (0–1).
      </p>
    </aside>
  );
}
