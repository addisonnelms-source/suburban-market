import Link from "next/link";
import { formatAddress, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brown/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-lg text-brown">{site.name}</p>
          <p className="mt-1 text-sm text-brown/60">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-brown/60 sm:text-right">
          <p>
            Inside {site.hostStore.name} ·{" "}
            <a
              href={site.hostStore.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown underline underline-offset-2"
            >
              {formatAddress()}
            </a>
          </p>
          <p>{site.hostStore.hours}</p>
          <p>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-brown underline underline-offset-2"
            >
              {site.contact.email}
            </a>
          </p>
          <p>
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown underline underline-offset-2"
            >
              Instagram
            </a>
            {" · "}
            <a
              href={site.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown underline underline-offset-2"
            >
              Facebook
            </a>
            {" · "}
            <Link href="/about" className="text-brown underline underline-offset-2">
              About
            </Link>
            {" · "}
            <Link href="/fusion-paint" className="text-brown underline underline-offset-2">
              Fusion Paint
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
