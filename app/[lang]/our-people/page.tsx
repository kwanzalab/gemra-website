import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, Eyebrow, PageHero } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { getDict, hasLocale, site } from "@/lib/i18n";

const founders = [
  "Dr Joseph Otshudiandjeka Omasumbu",
  "Dr Étienne Longe Omasumbu",
  "Dr Sandrine Bondjemba Mboyo",
  "M. Albert Katako Omasumbu",
  "Mme Gisèle Walo Nyengo",
  "M. Alexis Anyenyola Kutshe",
  "Me Raoul Onokenge Ombaku",
];

function initials(name: string) {
  const parts = name.replace(/^(Dr|M\.|Mme|Me)\s+/, "").split(" ");
  return (parts[0][0] + (parts[parts.length - 1][0] ?? "")).toUpperCase();
}

export async function generateMetadata({ params }: PageProps<"/[lang]/our-people">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.ourPeople, description: d.people.hero.lead };
}

export default async function OurPeople({ params }: PageProps<"/[lang]/our-people">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const p = d.people;

  return (
    <>
      <PageHero lang={lang} homeLabel={d.common.home} eyebrow={p.hero.eyebrow} title={p.hero.title} lead={p.hero.lead} image="/media/field-action.jpg" />

      <section className="section">
        <div className="shell gov">
          <div className="gov-copy">
            <Eyebrow>{p.governance.eyebrow}</Eyebrow>
            <h2>{p.governance.title}</h2>
            <p className="lead">{p.governance.p1}</p>
            <p>{p.governance.p2}</p>
            <a className="doc-card" href={site.statutes} target="_blank" rel="noreferrer">
              <span className="doc-icon"><Icon name="document" /></span>
              <span className="doc-text"><strong>{d.about.document.title}</strong><small>{d.about.document.meta}</small></span>
              <span className="doc-dl" aria-label={d.about.document.cta}><Icon name="download" /></span>
            </a>
          </div>
          <ol className="org-chart">
            {p.governance.levels.map((l, i) => (
              <li key={l.title} className={`org-node${i === 0 ? " org-node-main" : ""}`}>
                <span className="org-level">{l.level}</span>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <div className="head head-center">
            <Eyebrow>{p.team.eyebrow}</Eyebrow>
            <h2>{p.team.title}</h2>
            <p>{p.team.text}</p>
          </div>
          <ul className="team-grid">
            {founders.map((name, i) => (
              <li className={`member${i === 0 ? " member-lead" : ""}`} key={name}>
                <span className="member-avatar">{initials(name)}</span>
                <strong>{name}</strong>
                <span className="member-role">{p.team.roles[i]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} d={d.home.cta} />
    </>
  );
}
