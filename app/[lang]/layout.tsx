import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Blocks";
import { Header } from "@/components/Header";
import { getDict, hasLocale, locales, site } from "@/lib/i18n";
import "../globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a325c",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return {
    title: { default: d.meta.title, template: `%s | ${site.name}` },
    description: d.meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: { languages: { en: "/en", fr: "/fr" } },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      type: "website",
      locale: lang === "fr" ? "fr_CD" : "en_US",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body id="top">
        <a className="skip-link" href="#content">{dict.nav.skip}</a>
        <Header lang={lang} nav={dict.nav} topbar={dict.topbar} statutes={site.statutes} />
        <main id="content">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
