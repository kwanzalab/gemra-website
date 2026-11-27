import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PageHero } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { getDict, hasLocale, site, to } from "@/lib/i18n";

const topicIcons: IconName[] = ["partners", "briefcase", "document"];

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.contact, description: d.contact.hero.lead };
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const c = d.contact;
  const q = encodeURIComponent(site.mapQuery);

  const topicLinks = [
    { href: `https://www.google.com/maps/search/?api=1&query=${q}`, label: c.topics.partnerCta, external: true },
    { href: to(lang, "/careers"), label: c.topics.careersCta, external: false },
    { href: site.statutes, label: c.topics.docsCta, external: true },
  ];

  return (
    <>
      <PageHero lang={lang} homeLabel={d.common.home} eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} image="/media/field-community.jpg" />

      <section className="section">
        <div className="shell contact-grid">
          <div className="office-card">
            <span className="office-icon"><Icon name="building" /></span>
            <span className="office-label">{c.office.label}</span>
            <h2>{c.office.title}</h2>
            <address>
              {site.address.map((l) => <span key={l}>{l}</span>)}
              <span>{c.office.country}</span>
            </address>
            <div className="btn-row">
              <a className="btn btn-primary" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer">
                {c.office.directions} <Icon name="external" />
              </a>
              {site.email && (
                <a className="btn btn-ghost" href={`mailto:${site.email}`}>{c.office.email} <Icon name="mail" /></a>
              )}
            </div>
          </div>
          <div className="map-frame">
            <iframe
              title={c.mapTitle}
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <div className="head head-center">
            <Eyebrow>{c.topics.eyebrow}</Eyebrow>
            <h2>{c.topics.title}</h2>
          </div>
          <div className="pillars">
            {c.topics.items.map((t, i) => {
              const link = topicLinks[i];
              return (
                <article className="pillar" key={t.title}>
                  <span className="pillar-icon"><Icon name={topicIcons[i]} /></span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  {link.external ? (
                    <a className="link-arrow" href={link.href} target="_blank" rel="noreferrer">{link.label} <Icon name="arrow" /></a>
                  ) : (
                    <Link className="link-arrow" href={link.href}>{link.label} <Icon name="arrow" /></Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
