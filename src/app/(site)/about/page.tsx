import Link from "next/link";
import type { Metadata } from "next";
import { formatAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — an antique booth at Gathered Goods in Springdale, Arkansas.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-serif text-4xl text-brown">About {site.name}</h1>
      <p className="mt-2 text-brown/60">
        Est. {site.established} · Northwest Arkansas
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-brown/80">
        <p>
          <span className="font-medium text-brown">{site.name}</span> is an antique
          booth run by {site.owner.name}, offering carefully curated and
          hand-refinished furniture alongside vintage finds. Leigh is a mother who
          has lived in Northwest Arkansas for virtually her entire life.
        </p>

        <p>
          Since {site.established}, the booth has called a few different shops home
          around the region — but the heart of it has always been the same:
          giving old pieces new life and sharing them with the community.
        </p>

        <p>
          Today you&apos;ll find {site.name} inside{" "}
          <span className="font-medium text-brown">{site.hostStore.name}</span>, a
          shop for antique furniture and home décor in Springdale. Recent favorites
          include Victorian horse brass — decorative brass medallions once worn on
          horse harnesses, now collected for their history and craftsmanship.
        </p>

        <p>
          Leigh is also an authorized franchise vendor for{" "}
          <Link href="/fusion-paint" className="font-medium text-brown underline underline-offset-2">
            {site.fusionPaint.name}
          </Link>
          . Paint is available at the booth.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-brown/10 bg-white p-8">
        <h2 className="font-serif text-xl text-brown">Visit the booth</h2>
        <p className="mt-4 text-brown/70">
          Stop by {site.name} inside {site.hostStore.name} to browse in person.
          Items shown on this site are available for pickup at the shop — no
          online checkout.
        </p>
        <address className="mt-6 not-italic text-brown/80">
          <p className="font-medium text-brown">{site.hostStore.name}</p>
          <p className="mt-1 text-sm">{site.hostStore.description}</p>
          <a
            href={site.hostStore.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-brown underline underline-offset-2"
          >
            {formatAddress()}
          </a>
        </address>
      </div>
    </div>
  );
}
