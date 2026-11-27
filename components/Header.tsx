"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Lang } from "@/lib/i18n";

type Props = { lang: Lang; nav: Dict["nav"]; topbar: Dict["topbar"]; statutes: string };

type Item = {
  label: string;
  href?: string;
  match: string[];
  children?: { href: string; label: string; text: string }[];
};

function Chevron() {
  return (
    <svg className="chevron" viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

/** Swap the locale prefix of the current path: /en/careers -> /fr/careers */
function switchPath(pathname: string, target: Lang) {
  const parts = pathname.split("/");
  parts[1] = target;
  return parts.join("/") || `/${target}`;
}

export function LangSwitch({ lang, label, className = "" }: { lang: Lang; label: string; className?: string }) {
  const pathname = usePathname() || `/${lang}`;
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={label}>
      {(["en", "fr"] as const).map((l) => (
        <Link
          key={l}
          href={switchPath(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={l === lang ? "is-active" : ""}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export function Header({ lang, nav, topbar, statutes }: Props) {
  const pathname = usePathname() || `/${lang}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const p = (path: string) => `/${lang}${path}`;

  const items: Item[] = [
    {
      label: nav.about,
      match: ["/about", "/our-people"],
      children: [
        { href: p("/about"), label: nav.ourStory, text: nav.ourStoryText },
        { href: p("/our-people"), label: nav.ourPeople, text: nav.ourPeopleText },
      ],
    },
    {
      label: nav.whatWeDo,
      match: ["/what-we-do", "/field-work"],
      children: [
        { href: p("/what-we-do"), label: nav.focusAreas, text: nav.focusAreasText },
        { href: p("/what-we-do#approach"), label: nav.approach, text: nav.approachText },
        { href: p("/field-work"), label: nav.fieldWork, text: nav.fieldWorkText },
      ],
    },
    { label: nav.careers, href: p("/careers"), match: ["/careers"] },
    { label: nav.contact, href: p("/contact"), match: ["/contact"] },
  ];

  const isActive = (item: Item) => item.match.some((m) => pathname.startsWith(p(m)));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => window.innerWidth > 1080 && setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenSub(null);
        setMenuOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setOpenSub(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setOpenSub(null);
  };

  return (
    <>
      <div className="topbar">
        <div className="shell topbar-inner">
          <p className="topbar-tagline">{topbar.tagline}</p>
          <nav className="topbar-links" aria-label="Secondary">
            <Link href={p("/careers")}>{nav.careers}</Link>
            <span aria-hidden="true">|</span>
            <a href={statutes} target="_blank" rel="noreferrer">{nav.statutes}</a>
            <span aria-hidden="true">|</span>
            <Link href={p("/contact")}>{nav.contact}</Link>
            <LangSwitch lang={lang} label={nav.language} />
          </nav>
        </div>
      </div>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="shell nav-shell">
          <Link className="brand" href={p("")} aria-label="GMRA DRCongo">
            <Image className="brand-logo" src="/media/gmra-logo.jpg" alt="GMRA — Global Medical Relief Agency" width={1280} height={550} priority />
          </Link>

          <nav id="main-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main">
            <ul className="nav-links">
              <li className="nav-home-mobile">
                <Link className={`nav-link${pathname === p("") ? " is-active" : ""}`} href={p("")} onClick={close}>{nav.home}</Link>
              </li>
              {items.map((item) =>
                item.children ? (
                  <li
                    key={item.label}
                    className={`has-dropdown${openSub === item.label ? " is-open" : ""}`}
                    onMouseLeave={() => setOpenSub((s) => (s === item.label ? null : s))}
                  >
                    <button
                      type="button"
                      className={`nav-link${isActive(item) ? " is-active" : ""}`}
                      aria-expanded={openSub === item.label}
                      onClick={() => setOpenSub((s) => (s === item.label ? null : item.label))}
                    >
                      {item.label}
                      <Chevron />
                    </button>
                    <div className="dropdown">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={close}>
                          <strong>{child.label}</strong>
                          <span>{child.text}</span>
                        </Link>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link className={`nav-link${isActive(item) ? " is-active" : ""}`} href={item.href!} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <div className="nav-actions">
              <LangSwitch lang={lang} label={nav.language} className="lang-switch-mobile" />
              <Link className="btn btn-primary btn-sm" href={p("/contact")} onClick={close}>
                {nav.partner}
              </Link>
            </div>
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
