import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { AnalyticsProviders } from "@/components/seo/AnalyticsProviders";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import { getSettings } from "@/lib/content/repository";
import { getSiteUrl } from "@/lib/site-url";
import { ensureTheme, themeToCssVars } from "@/lib/theme";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body-loaded",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seoTitle,
      template: `%s · ${settings.siteName}`,
    },
    description: settings.seoDescription,
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName, url: siteUrl }],
    creator: settings.siteName,
    keywords: [
      "solutions engineer",
      "sales engineer",
      "computer science",
      settings.siteName,
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: settings.siteName,
      title: settings.seoTitle,
      description: settings.seoDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const theme = ensureTheme(settings.theme);
  const cssVars = themeToCssVars(theme);

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="min-h-full antialiased"
        style={{
          ...cssVars,
          ["--font-display" as string]: `var(--font-display-loaded), "${theme.fonts.display}", "Times New Roman", serif`,
          ["--font-body" as string]: `var(--font-body-loaded), "${theme.fonts.body}", system-ui, sans-serif`,
        }}
      >
        <PersonJsonLd settings={settings} />
        {children}
        <AnalyticsProviders />
      </body>
    </html>
  );
}
