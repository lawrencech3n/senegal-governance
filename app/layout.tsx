import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Quiet Republic — Governance in Senegal",
  description:
    "ECON 30 capstone: Why has Senegal experienced less political instability than its neighbors? Colonial rule, independence, and post-colonial governance compared.",
};

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/government", label: "Governance" },
  { href: "/timeline", label: "Timeline" },
  { href: "/culture", label: "Legacies" },
  { href: "/works-cited", label: "Works Cited" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:text-parchment focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <header className="border-b border-ink/15 bg-parchment/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <Link href="/" className="group">
              <p className="text-xs uppercase tracking-[0.3em] text-ink/60">
                ECON 30 · The Quiet Republic
              </p>
              <h1 className="font-serif text-2xl md:text-3xl text-ink leading-none mt-1">
                Senegal &amp; Political Stability
              </h1>
            </Link>
            <nav
              className="flex flex-wrap gap-x-5 gap-y-1 text-sm"
              aria-label="Main navigation"
            >
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-ink/70 hover:text-rust transition-colors duration-75"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main id="main-content" className="max-w-6xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-ink/15 mt-24 py-8 text-center text-xs text-ink/50">
          <div className="max-w-6xl mx-auto px-6">
            ECON 30 Capstone · Progress &amp; Inequality · Spring 2026.
            Sources: V-Dem, UCDP, CAM coups dataset.{" "}
            <Link
              href="/works-cited"
              className="underline hover:text-rust transition-colors duration-75"
            >
              Works cited →
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
