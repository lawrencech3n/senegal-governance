import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { serif, sans } from "@/lib/fonts";
import "./globals.css";

const siteUrl = "https://senegal-governance.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Quiet Republic — Governance in Senegal",
    template: "%s · The Quiet Republic",
  },
  description:
    "ECON 30 capstone: What explains Senegal's relative political stability compared to neighboring Francophone states since independence? Colonial rule, governance, and regional comparison.",
  openGraph: {
    title: "The Quiet Republic — Governance in Senegal",
    url: siteUrl,
    siteName: "Senegal Governance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain min-h-screen font-sans">
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
              <p className="font-serif text-2xl md:text-3xl text-ink leading-none mt-1">
                Senegal &amp; Political Stability
              </p>
            </Link>
            <SiteNav />
          </div>
        </header>
        <main id="main-content" className="max-w-6xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-ink/15 mt-24 py-8 text-center text-xs text-ink/50">
          <div className="max-w-6xl mx-auto px-6">
            ECON 30 Capstone · Progress &amp; Inequality · Spring 2026.{" "}
            <a
              href={siteUrl}
              className="underline hover:text-rust transition-colors duration-75"
            >
              senegal-governance.vercel.app
            </a>
            . Sources: V-Dem, UCDP, CAM coups dataset.{" "}
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
