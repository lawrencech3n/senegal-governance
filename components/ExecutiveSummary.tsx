import Link from "next/link";
import { executiveSummary } from "@/lib/data/narrative";

export function ExecutiveSummary() {
  return (
    <nav
      aria-label="Executive summary"
      className="border border-ink/15 bg-parchment/60 p-5 md:p-6 max-w-4xl"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-rust mb-4">
        In 30 seconds
      </p>
      <ol className="space-y-3 list-none">
        {executiveSummary.map((item) => (
          <li key={item.step} className="flex gap-4 items-start">
            <span className="font-serif text-2xl text-rust leading-none min-w-[1.5rem]">
              {item.step}
            </span>
            <div>
              <Link
                href={item.href}
                className="font-medium text-ink hover:text-rust transition-colors duration-75"
              >
                {item.label}
              </Link>
              <p className="text-sm text-ink/70 leading-relaxed mt-0.5">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
