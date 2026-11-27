import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, Eyebrow } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { openJobs } from "@/content/jobs";
import { getDict, hasLocale, to } from "@/lib/i18n";

export const revalidate = 86400;

const focusIcons: IconName[] = ["heart", "shield", "leaf", "partners"];
const statIcons: IconName[] = ["calendar", "pin", "globe", "shield"];
const valueImages = ["/media/hero-community.jpg", "/media/field-children.jpg", "/media/field-action.jpg"];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const h = d.home;
  const jobCount = openJobs().length;

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <Image className="home-hero-img" src="/media/field-team.jpg" alt={h.hero.imageAlt} fill priority sizes="100vw" />
        <div className="home-hero-shade" />
        <div className="shell home-hero-inner">
          <Eyebrow light>{h.hero.eyebrow}</Eyebrow>
          <h1>
            {h.hero.titleStart}
            <mark className="hl">{h.hero.titleHighlight}</mark>
            {h.hero.titleEnd}
          </h1>
          <p className="home-hero-lead">{h.hero.lead}</p>
          <div className="btn-row">
            <Link className="btn btn-primary" href={to(lang, "/what-we-do")}>{h.hero.ctaPrimary} <Icon name="arrow" /></Link>
            <Link className="btn btn-outline-light" href={to(lang, "/careers")}>{h.hero.ctaSecondary}</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-wrap" aria-label="GMRA">
        <div className="shell">
          <ul className="stats">
            {h.stats.map((s, i) => (
              <li key={s.value}>
                <span className="stat-icon"><Icon name={statIcons[i]} /></span>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTRO — overlapping image + panel on patterned band */}
      <section className="overlap-section">
        <div className="pattern-band" aria-hidden="true" />
        <div className="shell overlap">
          <div className="overlap-img">
            <Image src="/media/mission-team.jpg" alt={h.intro.imageAlt} fill sizes="(max-width: 1080px) 100vw, 55vw" />
          </div>
          <div className="overlap-panel">
            <Eyebrow>{h.intro.eyebrow}</Eyebrow>
            <h2>
              {h.intro.titleStart}
              <mark className="hl">{h.intro.titleHighlight}</mark>
            </h2>
            <p>{h.intro.text}</p>
            <Link className="link-arrow" href={to(lang, "/about")}>{h.intro.cta} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="section focus-home">
        <div className="angle-shape" aria-hidden="true" />
        <div className="shell">
          <div className="head head-split">
            <div>
              <Eyebrow>{h.focus.eyebrow}</Eyebrow>
              <h2>{h.focus.title}</h2>
            </div>
            <p>{h.focus.text}</p>
          </div>
          <div className="focus-grid">
            {d.whatWeDo.areas.map((a, i) => (
              <Link key={a.title} className="focus-card" href={to(lang, "/what-we-do")}>
                <span className="focus-icon"><Icon name={focusIcons[i]} /></span>
                <span className="focus-num">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className="focus-more">{d.common.learnMore} <Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — alternating image + colour panels */}
      <section className="section values">
        <div className="shell">
          <div className="head head-center">
            <Eyebrow>{h.values.eyebrow}</Eyebrow>
            <h2>{h.values.title}</h2>
          </div>
          <div className="value-list">
            {h.values.items.map((v, i) => (
              <article key={v.title} className={`value value-${i + 1}`}>
                <div className="value-img">
                  <Image src={valueImages[i]} alt={v.imageAlt} fill sizes="(max-width: 1080px) 100vw, 45vw" />
                </div>
                <div className="value-panel">
                  <span className="value-num">0{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FIELD TEASER */}
      <section className="section field-teaser">
        <div className="shell field-teaser-grid">
          <div className="field-teaser-copy">
            <Eyebrow>{h.field.eyebrow}</Eyebrow>
            <h2>{h.field.title}</h2>
            <p>{h.field.text}</p>
            <Link className="btn btn-primary" href={to(lang, "/field-work")}>{h.field.cta} <Icon name="arrow" /></Link>
          </div>
          <div className="mosaic">
            <div className="mosaic-a"><Image src="/media/field-class.jpg" alt="" fill sizes="(max-width: 1080px) 60vw, 30vw" /></div>
            <div className="mosaic-b"><Image src="/media/field-logistics.jpg" alt="" fill sizes="(max-width: 1080px) 40vw, 20vw" /></div>
            <div className="mosaic-c"><Image src="/media/field-community.jpg" alt="" fill sizes="(max-width: 1080px) 60vw, 30vw" /></div>
          </div>
        </div>
      </section>

      {/* CAREERS TEASER */}
      <section className="careers-teaser">
        <div className="shell careers-teaser-inner">
          <div className="careers-count">
            <strong>{jobCount}</strong>
            <span>{h.careers.open}</span>
          </div>
          <div className="careers-teaser-copy">
            <Eyebrow>{h.careers.eyebrow}</Eyebrow>
            <h2>{h.careers.title}</h2>
            <p>{h.careers.text}</p>
          </div>
          <Link className="btn btn-primary" href={to(lang, "/careers")}>{h.careers.cta} <Icon name="arrow" /></Link>
        </div>
      </section>

      <CtaBand lang={lang} d={h.cta} />
    </>
  );
}
