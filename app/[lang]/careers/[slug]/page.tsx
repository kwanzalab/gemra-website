import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getJob, jobs, openJobs } from "@/content/jobs";
import { formatDate, getDict, hasLocale, locales, site, to } from "@/lib/i18n";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => jobs.map((j) => ({ lang, slug: j.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/careers/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const job = getJob(slug);
  if (!hasLocale(lang) || !job) return {};
  return { title: job.title[lang], description: job.summary[lang] };
}

export default async function JobPage({ params }: PageProps<"/[lang]/careers/[slug]">) {
  const { lang, slug } = await params;
  const job = getJob(slug);
  if (!hasLocale(lang) || !job) notFound();
  const d = getDict(lang);
  const t = d.careers.job;
  const others = openJobs().filter((j) => j.slug !== job.slug).slice(0, 3);
  const mail = site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(`${job.ref} — ${job.title[lang]}`)}`
    : null;

  return (
    <>
      <section className="job-hero">
        <div className="shell">
          <nav className="crumbs crumbs-dark" aria-label="Breadcrumb">
            <Link href={to(lang)}>{d.common.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={to(lang, "/careers")}>{d.nav.careers}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{job.title[lang]}</span>
          </nav>
          <span className="job-dept">{job.department[lang]}</span>
          <h1>{job.title[lang]}</h1>
          <ul className="job-meta job-meta-lg">
            <li><Icon name="pin" />{job.location}</li>
            <li><Icon name="briefcase" />{job.type[lang]}</li>
            <li><Icon name="clock" />{t.deadline}: {formatDate(lang, job.deadline)}</li>
          </ul>
        </div>
      </section>

      <section className="section job-body">
        <div className="shell job-layout">
          <article className="job-content">
            <h2>{t.about}</h2>
            <p className="lead">{job.summary[lang]}</p>

            <h2>{t.responsibilities}</h2>
            <ul className="bullets">{job.responsibilities[lang].map((r) => <li key={r}>{r}</li>)}</ul>

            <h2>{t.requirements}</h2>
            <ul className="bullets">{job.requirements[lang].map((r) => <li key={r}>{r}</li>)}</ul>

            <h2>{t.offer}</h2>
            <ul className="checks">{job.offer[lang].map((r) => <li key={r}><Icon name="check" /> {r}</li>)}</ul>

            <div className="apply-box" id="apply">
              <h2>{t.howToApply}</h2>
              <p>{t.applyText}</p>
              <address>
                <strong>{site.name}</strong>
                {site.address.map((l) => <span key={l}>{l}</span>)}
                <span>{d.contact.office.country}</span>
              </address>
              <p className="apply-ref">{t.reference}: <strong>{job.ref}</strong></p>
              {mail && <a className="btn btn-primary" href={mail}>{t.applyEmail} <Icon name="mail" /></a>}
            </div>

            <Link className="link-arrow link-back" href={to(lang, "/careers")}><Icon name="arrow" /> {t.back}</Link>
          </article>

          <aside className="job-aside">
            <div className="job-summary">
              <h3>{t.summary}</h3>
              <dl>
                <div><dt>{t.reference}</dt><dd>{job.ref}</dd></div>
                <div><dt>{t.department}</dt><dd>{job.department[lang]}</dd></div>
                <div><dt>{t.location}</dt><dd>{job.location}</dd></div>
                <div><dt>{t.type}</dt><dd>{job.type[lang]}</dd></div>
                <div><dt>{t.posted}</dt><dd>{formatDate(lang, job.posted)}</dd></div>
                <div><dt>{t.deadline}</dt><dd>{formatDate(lang, job.deadline)}</dd></div>
              </dl>
              <a className="btn btn-primary btn-block" href={mail ?? "#apply"}>{t.howToApply} <Icon name="arrow" /></a>
            </div>

            {others.length > 0 && (
              <div className="job-others">
                <h3>{t.other}</h3>
                {others.map((o) => (
                  <Link key={o.slug} href={to(lang, `/careers/${o.slug}`)}>
                    <strong>{o.title[lang]}</strong>
                    <span>{o.location} · {o.type[lang]}</span>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
