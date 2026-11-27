import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand, Eyebrow, PageHero } from "@/components/Blocks";
import { Gallery, type GalleryImage } from "@/components/Gallery";
import { getDict, hasLocale } from "@/lib/i18n";

const photos: { src: string; size: GalleryImage["size"] }[] = [
  { src: "/media/field-logistics.jpg", size: "tall" },
  { src: "/media/hero-community.jpg", size: "wide" },
  { src: "/media/field-community.jpg", size: "standard" },
  { src: "/media/field-class.jpg", size: "standard" },
  { src: "/media/field-action.jpg", size: "wide" },
  { src: "/media/field-infrastructure.jpg", size: "standard" },
];

export async function generateMetadata({ params }: PageProps<"/[lang]/field-work">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.fieldWork, description: d.field.hero.lead };
}

export default async function FieldWork({ params }: PageProps<"/[lang]/field-work">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const f = d.field;
  const images: GalleryImage[] = photos.map((p, i) => ({ ...p, caption: f.gallery.captions[i], alt: f.gallery.captions[i] }));

  return (
    <>
      <PageHero lang={lang} homeLabel={d.common.home} eyebrow={f.hero.eyebrow} title={f.hero.title} lead={f.hero.lead} image="/media/field-team.jpg" />

      <section className="section">
        <div className="shell story">
          <div className="story-img">
            <Image src="/media/field-children.jpg" alt={f.story.imageAlt} fill sizes="(max-width: 1080px) 100vw, 55vw" />
          </div>
          <div className="story-panel">
            <Eyebrow light>{f.story.eyebrow}</Eyebrow>
            <h2>{f.story.title}</h2>
            <p className="lead">{f.story.lead}</p>
            <p>{f.story.text}</p>
            <figure className="story-quote">
              <blockquote>“{f.story.quote}”</blockquote>
              <figcaption>— {f.story.quoteBy}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="gallery">
        <div className="shell">
          <div className="head head-split">
            <div>
              <Eyebrow>{f.gallery.eyebrow}</Eyebrow>
              <h2>{f.gallery.title}</h2>
            </div>
            <p>{f.gallery.text}</p>
          </div>
          <Gallery images={images} labels={f.gallery} />
        </div>
      </section>

      <CtaBand lang={lang} d={d.home.cta} />
    </>
  );
}
