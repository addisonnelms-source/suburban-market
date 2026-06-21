"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subLinks = [
  { href: "/fusion-paint/browse", label: "Browse" },
  { href: "/fusion-paint/mixer", label: "Fusion Paint Mixer" },
];

function subNavClass(isActive: boolean) {
  return isActive
    ? "rounded-full bg-brown px-5 py-2 text-sm font-medium text-cream"
    : "px-5 py-2 text-sm font-medium text-brown/70 transition-colors hover:text-brown";
}

function isSubNavActive(pathname: string, href: string) {
  if (href === "/fusion-paint/browse") {
    return (
      pathname === "/fusion-paint/browse" ||
      pathname === "/fusion-paint" ||
      (pathname.startsWith("/fusion-paint/") &&
        !pathname.startsWith("/fusion-paint/mixer"))
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FusionPaintSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-brown/10 pb-6">
      {subLinks.map((link) => {
        const active = isSubNavActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={subNavClass(active)}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
