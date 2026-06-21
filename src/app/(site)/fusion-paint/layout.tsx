import { FusionPaintSubNav } from "@/components/FusionPaintSubNav";
import { site } from "@/lib/site";

export default function FusionPaintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl text-brown">{site.fusionPaint.name}</h1>
        <p className="mt-4 leading-relaxed text-brown/80">
          {site.fusionPaint.description} {site.name} is an authorized franchise
          vendor — paint is available for pickup at the booth inside{" "}
          {site.hostStore.name}.
        </p>
        <a
          href={site.fusionPaint.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-brown underline underline-offset-2"
        >
          Official {site.fusionPaint.name} website →
        </a>
      </div>

      <div className="mt-10">
        <FusionPaintSubNav />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
