import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LangSwitch } from "@/components/Header";
import { type Dict, type Lang, site, to } from "@/lib/i18n";

/** Section label above headings */
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{children}</p>;
}

/** Inner-page hero banner with breadcrumb */
export function PageHero({
  lang,
  homeLabel,
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  children,
}: {
  lang: Lang;
  homeLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <Image className="page-hero-img" src={image} alt={imageAlt} fill priority sizes="100vw" />
      <div className="page-hero-shade" />
      <div className="shell page-hero-inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href={to(lang)}>{homeLabel}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <h1>{title}</h1>
        <p className="page-hero-lead">{lead}</p>
        {children}
      </div>
      <div className="page-hero-angle" aria-hidden="true" />
    </section>
  );
}

/** Blue call-to-action band used at the bottom of most pages */
export function CtaBand({ lang, d }: { lang: Lang; d: Dict["home"]["cta"] }) {
  return (
    <section className="cta-band">
      <div className="shell cta-band-inner">
        <div>
          <Eyebrow light>{d.eyebrow}</Eyebrow>
          <h2>{d.title}</h2>
          <p>{d.text}</p>
        </div>
        <div className="cta-band-actions">
          <Link className="btn btn-white" href={to(lang, "/contact")}>
            {d.primary} <Icon name="arrow" />
          </Link>
          <a className="btn btn-outline-light" href={site.statutes} target="_blank" rel="noreferrer">
            {d.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ lang, dict }: { lang: Lang; dict: Dict }) {
  const { nav, footer } = dict;
  const p = (path: string) => to(lang, path);
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">
            <Image src="/media/gmra-logo.jpg" alt="GMRA" width={1280} height={550} />
          </span>
          <p>{footer.about}</p>
          <LangSwitch lang={lang} label={nav.language} className="lang-switch-footer" />
        </div>
        <div className="footer-col">
          <p className="footer-title">{footer.explore}</p>
          <Link href={p("/about")}>{nav.ourStory}</Link>
          <Link href={p("/our-people")}>{nav.ourPeople}</Link>
          <Link href={p("/careers")}>{nav.careers}</Link>
          <Link href={p("/contact")}>{nav.contact}</Link>
        </div>
        <div className="footer-col">
          <p className="footer-title">{footer.work}</p>
          <Link href={p("/what-we-do")}>{nav.focusAreas}</Link>
          <Link href={p("/what-we-do#approach")}>{nav.approach}</Link>
          <Link href={p("/field-work")}>{nav.fieldWork}</Link>
          <a href={site.statutes} target="_blank" rel="noreferrer">{nav.statutes} ↗</a>
        </div>
        <div className="footer-col">
          <p className="footer-title">{footer.contact}</p>
          {site.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span>{dict.contact.office.country}</span>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}. {footer.rights} · {footer.nonprofit}</p>
        <a href="#top">{footer.top} ↑</a>
      </div>
    </footer>
  );
}
