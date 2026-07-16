import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { getSettings } from "@/lib/content/repository";
import { themeToCssVars } from "@/lib/theme";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
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
  const cssVars = themeToCssVars(settings.theme);

  return (
    <html lang="en" className={`${fraunces.variable} ${sora.variable} h-full`}>
      <body
        className="min-h-full antialiased"
        style={{
          ...cssVars,
          ["--font-display" as string]: `var(--font-fraunces), "${settings.theme.fonts.display}", Georgia, serif`,
          ["--font-body" as string]: `var(--font-sora), "${settings.theme.fonts.body}", system-ui, sans-serif`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
