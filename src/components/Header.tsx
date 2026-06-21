"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/fusion-paint", label: "Fusion Paint" },
];

function Logo() {
  return (
    <Link href="/" className="group flex flex-col leading-none">
      <span className="font-serif text-xl tracking-tight text-brown sm:text-2xl">
        {site.name}
      </span>
      <span className="mt-1 text-xs tracking-widest text-brown/50 uppercase">
        Est. {site.established}
      </span>
    </Link>
  );
}

function navClass(isActive: boolean) {
  return isActive
    ? "rounded-full bg-brown px-5 py-2 text-sm font-medium text-cream"
    : "px-5 py-2 text-sm font-medium text-brown/70 transition-colors hover:text-brown";
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Nav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`flex flex-wrap items-center gap-4 sm:gap-8 ${className}`}>
      {navLinks.map((link) => {
        const active = isActivePath(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={navClass(active)}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  return (
    <header className="border-b border-brown/10 bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}

export function MobileHeader() {
  return (
    <header className="border-b border-brown/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}
