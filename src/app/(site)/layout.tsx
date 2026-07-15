import { Footer } from "@/components/Footer";
import { MobileHeader } from "@/components/Header";

// Refresh listing pages periodically so Studio publishes show on the live site
export const revalidate = 60;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <MobileHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
