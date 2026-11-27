import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PageHero } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { JobBoard, type JobCard } from "@/components/JobBoard";
import { openJobs } from "@/content/jobs";
import { formatDate, getDict, hasLocale, to } from "@/lib/i18n";

export const revalidate = 3600;

const whyIcons: IconName[] = ["heart", "balance", "trend"];
const stepIcons: IconName[] = ["mail", "search", "users", "star"];

export async function generateMetadata({ params }: PageProps<"/[lang]/careers">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.careers, description: d.careers.hero.lead };
}

export default async function Careers({ params }: PageProps<"/[lang]/careers">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const c = d.careers;

  const cards: JobCard[] = openJobs().map((j) => ({
    slug: j.slug,
    href: to(lang, `/careers/${j.slug}`),
    ref: j.ref,
    title: j.title[lang],
    department: j.department[lang],
    location: j.location,
    type: j.type[lang],
    summary: j.summary[lang],
    posted: formatDate(lang, j.posted),
    deadline: formatDate(lang, j.deadline),
  }));

  return (
    <>
      <PageHero lang={lang} homeLabel={d.common.home} eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} image="/media/mission-team.jpg">
        <a className="btn btn-primary" href="#positions">{c.hero.cta} <Icon name="arrow" /></a>
      </PageHero>

      <section className="section">
        <div className="shell">
          <div className="head head-center">
            <Eyebrow>{c.why.eyebrow}</Eyebrow>
            <h2>{c.why.title}</h2>
          </div>
          <div className="pillars">
            {c.why.items.map((w, i) => (
              <article className="pillar" key={w.title}>
                <span className="pillar-icon"><Icon name={whyIcons[i]} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="positions">
        <div className="shell">
          <div className="head">
            <Eyebrow>{c.board.eyebrow}</Eyebrow>
            <h2>{c.board.title}</h2>
          </div>
          <JobBoard jobs={cards} t={c.board} />

          <div className="spontaneous">
            <div className="spontaneous-img">
              <Image src="/media/field-class.jpg" alt="" fill sizes="(max-width: 1080px) 100vw, 30vw" />
            </div>
            <div>
              <h3>{c.spontaneous.title}</h3>
              <p>{c.spontaneous.text}</p>
            </div>
            <Link className="btn btn-primary" href={to(lang, "/contact")}>{c.spontaneous.cta} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="head head-center">
            <Eyebrow>{c.process.eyebrow}</Eyebrow>
            <h2>{c.process.title}</h2>
          </div>
          <ol className="steps steps-light">
            {c.process.steps.map((s, i) => (
              <li className="step" key={s.title}>
                <div className="step-badge">
                  <Icon name={stepIcons[i]} />
                  <span>{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="equal-note"><Icon name="balance" /> {c.equal}</p>
        </div>
      </section>
    </>
  );
}
