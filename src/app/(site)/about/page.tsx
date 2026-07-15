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
          <span className="font-medium text-brown">{site.name}</span> is a curated
          marketplace offering various home goods where you will find refinished
          furniture alongside vintage treasures. Owner {site.owner.name} is thankful
          to have {site.name} as her creative outlet and to have met so many
          wonderful customers and fellow vendors through the years. Leigh has lived
          in Northwest Arkansas for much of her life and raised her two children
          Riley and Addison alongside her husband David here.
        </p>

        <p>
          Since {site.established}, {site.name} has called a few different shops home
          around the region — but the heart of it has always been the same: giving
          old pieces new life and sharing them with the community.
        </p>

        <p>
          Today you&apos;ll find {site.name} inside{" "}
          <span className="font-medium text-brown">{site.hostStore.name}</span>, a
          shop for vintage furniture and home décor in Springdale. Recent favorites
          in the booth include Victorian horse brass — decorative brass medallions
          once worn on horse harnesses, now collected for their history and
          craftsmanship. You will often find furniture pieces given new life with
          Fusion Mineral Paint or other finishes.
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
          <p className="mt-2 text-sm text-brown/70">{site.hostStore.hours}</p>
        </address>

        <div className="mt-8 border-t border-brown/10 pt-6">
          <h3 className="font-serif text-lg text-brown">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm text-brown/80">
            <li>
              Email:{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-brown underline underline-offset-2"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown underline underline-offset-2"
              >
                @suburbanmarketnwa
              </a>
            </li>
            <li>
              Facebook:{" "}
              <a
                href={site.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown underline underline-offset-2"
              >
                Suburban Market
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
