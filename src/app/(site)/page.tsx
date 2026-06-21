import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { getFeaturedListings } from "@/lib/listings";
import { formatAddress, site } from "@/lib/site";

export default async function HomePage() {
  const featured = await getFeaturedListings(3);

  return (
    <>
      <section className="border-b border-brown/10 bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="mb-4 text-sm font-medium tracking-widest text-sage uppercase">
              At {site.hostStore.name} · Est. {site.established}
            </p>
            <h1 className="font-serif text-4xl leading-tight text-brown sm:text-5xl">
              Curated finds,{" "}
              <span className="italic">refinished</span> with care
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brown/70">
              {site.name} is an antique booth inside {site.hostStore.name} in
              Springdale — offering hand-refinished furniture and vintage horse brass.
              Leigh is also an authorized vendor for{" "}
              <Link href="/fusion-paint" className="text-brown underline underline-offset-2">
                Fusion Mineral Paint
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-brown px-7 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-90"
              >
                View current listings
              </Link>
              <Link
                href="/about"
                className="rounded-full px-7 py-3 text-sm font-medium text-brown ring-1 ring-brown/20 transition-colors hover:bg-white"
              >
                About the booth
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <HeroTile
              label="Furniture"
              description="Refinished & restored pieces"
              className="col-span-2 sm:col-span-1"
            />
            <HeroTile
              label="Horse Brass"
              description="Vintage equestrian collectibles"
              className="col-span-2 sm:col-span-1"
            />
            <Link
              href="/fusion-paint"
              className="col-span-2 block rounded-xl border border-brown/10 bg-white p-6 transition-colors hover:border-brown/25"
            >
              <p className="font-serif text-lg text-brown">Fusion Paint</p>
              <p className="mt-1 text-sm text-brown/60">
                Authorized franchise vendor
              </p>
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-brown">Featured items</h2>
              <p className="mt-2 text-brown/60">Available now at the booth</p>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-medium text-brown/70 hover:text-brown sm:block"
            >
              See all →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="text-sm font-medium text-brown/70 hover:text-brown"
            >
              See all listings →
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-brown/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-serif text-2xl text-brown">Visit the booth</h2>
          <p className="mx-auto mt-4 max-w-md text-brown/70">
            Find {site.name} inside {site.hostStore.name} in Springdale. Browse
            here, then come see items in person — no online checkout.
          </p>
          <a
            href={site.hostStore.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-brown underline underline-offset-2"
          >
            {formatAddress()}
          </a>
        </div>
      </section>
    </>
  );
}

function HeroTile({
  label,
  description,
  className = "",
}: {
  label: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-brown/10 bg-white p-6 ${className}`}
    >
      <p className="font-serif text-lg text-brown">{label}</p>
      <p className="mt-1 text-sm text-brown/60">{description}</p>
    </div>
  );
}
