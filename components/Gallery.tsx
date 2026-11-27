"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type GalleryImage = { src: string; alt: string; caption: string; size: "tall" | "wide" | "standard" };

type Labels = { close: string; prev: string; next: string; enlarge: string; dialog: string };

export function Gallery({ images, labels }: { images: GalleryImage[]; labels: Labels }) {
  const [active, setActive] = useState<number | null>(null);
  const n = images.length;
  const next = () => setActive((c) => (c === null ? 0 : (c + 1) % n));
  const prev = () => setActive((c) => (c === null ? 0 : (c - 1 + n) % n));

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((c) => (c === null ? 0 : (c + 1) % n));
      if (e.key === "ArrowLeft") setActive((c) => (c === null ? 0 : (c - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, n]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className={`gallery-item gallery-${img.size}`}
            onClick={() => setActive(i)}
            aria-label={`${labels.enlarge}: ${img.caption}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 85vw, (max-width: 1080px) 50vw, 33vw" />
            <span className="gallery-shade" />
            <span className="gallery-caption">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {img.caption}
            </span>
            <span className="gallery-expand" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M9 4H4v5M15 4h5v5M20 15v5h-5M4 15v5h5" /></svg>
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={labels.dialog}>
          <button className="lightbox-backdrop" type="button" onClick={() => setActive(null)} aria-label={labels.close} />
          <div className="lightbox-content">
            <Image src={images[active].src} alt={images[active].alt} fill sizes="95vw" priority />
          </div>
          <div className="lightbox-label">
            <span>{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <p>{images[active].caption}</p>
          </div>
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label={labels.close}>
            <svg viewBox="0 0 24 24"><path d="m5 5 14 14M19 5 5 19" /></svg>
          </button>
          <button className="lightbox-arrow lightbox-previous" type="button" onClick={prev} aria-label={labels.prev}>
            <svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7" /></svg>
          </button>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={next} aria-label={labels.next}>
            <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
