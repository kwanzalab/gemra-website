import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand, Eyebrow, PageHero } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { getDict, hasLocale } from "@/lib/i18n";

const areaImages = ["/media/hero-community.jpg", "/media/field-logistics.jpg", "/media/field-team.jpg", "/media/field-action.jpg"];
const areaIcons: IconName[] = ["heart", "shield", "leaf", "partners"];
const stepIcons: IconName[] = ["users", "search", "heart", "trend"];

export async function generateMetadata({ params }: PageProps<"/[lang]/what-we-do">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.whatWeDo, description: d.whatWeDo.hero.lead };
}

export default async function WhatWeDo({ params }: PageProps<"/[lang]/what-we-do">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const w = d.whatWeDo;

  return (
    <>
      <PageHero lang={lang} homeLabel={d.common.home} eyebrow={w.hero.eyebrow} title={w.hero.title} lead={w.hero.lead} image="/media/field-children.jpg" />

      <section className="section">
        <div className="shell area-list">
          {w.areas.map((a, i) => (
            <article key={a.title} className={`area${i % 2 ? " area-flip" : ""}`}>
              <div className="area-img">
                <Image src={areaImages[i]} alt={a.imageAlt} fill sizes="(max-width: 1080px) 100vw, 50vw" />
              </div>
              <div className="area-copy">
                <span className="area-tag"><Icon name={areaIcons[i]} /> {a.tag}</span>
                <h2>{a.title}</h2>
                <p>{a.text}</p>
                <ul className="checks">
                  {a.points.map((pt) => (
                    <li key={pt}><Icon name="check" /> {pt}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-pattern" id="approach">
        <div className="shell">
          <div className="head head-center">
            <Eyebrow light>{w.approach.eyebrow}</Eyebrow>
            <h2>{w.approach.title}</h2>
            <p>{w.approach.text}</p>
          </div>
          <ol className="steps">
            {w.approach.steps.map((s, i) => (
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
        </div>
      </section>

      <CtaBand lang={lang} d={d.home.cta} />
    </>
  );
}
