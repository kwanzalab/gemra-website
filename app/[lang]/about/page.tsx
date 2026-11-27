import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, Eyebrow, PageHero } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { getDict, hasLocale, site, to } from "@/lib/i18n";

const pillarIcons: IconName[] = ["compass", "partners", "balance"];

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.about.hero.title, description: d.about.hero.lead };
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const a = d.about;

  return (
    <>
      <PageHero lang={lang} homeLabel={d.common.home} eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} image="/media/hero-community.jpg" />

      <section className="section">
        <div className="shell split">
          <div className="split-copy">
            <Eyebrow>{a.story.eyebrow}</Eyebrow>
            <h2>
              {a.story.titleStart}
              <mark className="hl">{a.story.titleHighlight}</mark>
            </h2>
            <p className="lead">{a.story.p1}</p>
            <p>{a.story.p2}</p>
          </div>
          <div className="framed-img">
            <Image src="/media/mission-team.jpg" alt={a.story.imageAlt} fill sizes="(max-width: 1080px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="quote-band">
        <div className="shell">
          <blockquote>{a.statement}</blockquote>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="pillars">
            {a.pillars.map((p, i) => (
              <article className="pillar" key={p.title}>
                <span className="pillar-icon"><Icon name={pillarIcons[i]} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell facts">
          <div>
            <Eyebrow>{a.facts.eyebrow}</Eyebrow>
            <h2>{a.facts.title}</h2>
            <a className="doc-card" href={site.statutes} target="_blank" rel="noreferrer">
              <span className="doc-icon"><Icon name="document" /></span>
              <span className="doc-text"><strong>{a.document.title}</strong><small>{a.document.meta}</small></span>
              <span className="doc-dl" aria-label={a.document.cta}><Icon name="download" /></span>
            </a>
          </div>
          <dl className="fact-table">
            {a.facts.items.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section next-step">
        <div className="shell next-card">
          <div className="next-img">
            <Image src="/media/field-action.jpg" alt="" fill sizes="(max-width: 1080px) 100vw, 40vw" />
          </div>
          <div className="next-copy">
            <h2>{a.next.title}</h2>
            <p>{a.next.text}</p>
            <Link className="btn btn-primary" href={to(lang, "/our-people")}>{a.next.cta} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} d={d.home.cta} />
    </>
  );
}
