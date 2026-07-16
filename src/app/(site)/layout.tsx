import { EngagementTracker } from "@/components/analytics/EngagementTracker";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { getSettings } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <div className="flex min-h-full flex-col">
      <EngagementTracker />
      <SiteHeader settings={settings} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}
