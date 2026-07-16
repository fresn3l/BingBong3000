import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { getSettings } from "@/lib/content/repository";
import { ensureTheme, themeToCssVars } from "@/lib/theme";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: settings.seoTitle,
      template: `%s · ${settings.siteName}`,
    },
    description: settings.seoDescription,
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
        {children}
      </body>
    </html>
  );
}
