import type { Metadata } from "next";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "After the Tricolor — Senegal & French Exploitation",
  description:
    "An interactive examination of French exploitation in Senegal, before and after independence.",
};

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/timeline", label: "Timeline" },
  { href: "/extraction", label: "Extraction" },
  { href: "/map", label: "Map" },
  { href: "/government", label: "Government" },
  { href: "/environment", label: "Environment" },
  { href: "/culture", label: "Culture" },
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
                After the Tricolor
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
            Sources: World Bank, UN Comtrade, OEC, USGS, V-Dem, UCDP. Some
            figures are approximations drawn from secondary literature.{" "}
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
