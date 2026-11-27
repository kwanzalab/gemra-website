import { en } from "@/content/en";
import { fr } from "@/content/fr";

export const locales = ["en", "fr"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

export type Dict = typeof en;

const dictionaries: Record<Lang, Dict> = { en, fr };

export const hasLocale = (value: string): value is Lang =>
  (locales as readonly string[]).includes(value);

export const getDict = (lang: Lang): Dict => dictionaries[lang];

/** Build a localised internal URL, e.g. to("fr", "/careers") -> "/fr/careers" */
export const to = (lang: Lang, path = "") => `/${lang}${path}`;

export const formatDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

export const site = {
  name: "GMRA DRCongo",
  fullName: "Global Medical Relief Agency",
  statutes: "/media/statuts-gmra-2010.pdf",
  address: ["Avenue Tombalbay n° 5755", "Commune de la Gombe", "Kinshasa"],
  /**
   * Add the official contact / recruitment e-mail here to enable
   * "E-mail us" and "Apply by e-mail" buttons across the site.
   */
  email: "",
  mapQuery: "Avenue Tombalbay, Gombe, Kinshasa",
};
