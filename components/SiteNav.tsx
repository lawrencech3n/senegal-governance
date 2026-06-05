"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/government", label: "Governance" },
  { href: "/timeline", label: "Timeline" },
  { href: "/culture", label: "Legacies" },
  { href: "/works-cited", label: "Works Cited" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap gap-x-5 gap-y-1 text-sm"
      aria-label="Main navigation"
    >
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`transition-colors duration-75 border-b-2 pb-0.5 ${
              active
                ? "text-ink border-rust font-medium"
                : "text-ink/70 border-transparent hover:text-rust"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
