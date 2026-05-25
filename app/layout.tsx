import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Quiet Republic — Governance in Senegal",
  description:
    "Why has Senegal experienced less political instability than its neighbors? Colonial rule, independence, and post-colonial governance compared.",
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
        <header className="border-b border-ink/15 bg-parchment/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <Link href="/" className="group">
              <div className="text-xs uppercase tracking-[0.3em] text-ink/60">
                Lawrence&apos;s Econ Project
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-ink leading-none mt-1">
                The Quiet Republic
              </h1>
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
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
        <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
        <footer className="border-t border-ink/15 mt-24 py-8 text-center text-xs text-ink/50">
          <div className="max-w-6xl mx-auto px-6">
            Sources: V-Dem, UCDP, CAM coups dataset, World Bank. Student research
            project on Senegalese governance.{" "}
            <Link
              href="/works-cited"
              className="underline hover:text-rust transition-colors duration-75"
            >
              Full works cited →
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
