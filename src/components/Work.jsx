import { useState, useCallback, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import { img, workPhotos } from "../data/photos";
import { CATEGORIES } from "../data/content";

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const items =
    filter === "All" ? workPhotos : workPhotos.filter((i) => i.category === filter);

  const openAt = (index) => setLightbox(index);
  const close = useCallback(() => setLightbox(null), []);

  const step = useCallback(
    (dir) => {
      setLightbox((current) => {
        if (current === null) return current;
        const len = items.length;
        return (current + dir + len) % len;
      });
    },
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, step]);

  return (
    <section id="work" className="section">
      <SectionHeading num="02" title="Work" sub="Curated photography" />

      <div className="filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={filter === c ? "filter active" : "filter"}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {items.map((item, i) => {
          const photo = img(item.id);
          return (
            <button
              key={item.id}
              className={`work-item ratio-${item.ratio}`}
              onClick={() => openAt(i)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <span className="work-item-overlay">
                <span className="work-item-title">{item.title}</span>
                <span className="work-item-cat">{item.category}</span>
              </span>
            </button>
          );
        })}
      </div>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={close} aria-label="Close">
            &times;
          </button>
          <button className="lightbox-nav prev" onClick={() => step(-1)} aria-label="Previous">
            &#8249;
          </button>
          <figure>
            <img
              src={img(items[lightbox].id).src}
              alt={img(items[lightbox].id).alt}
            />
            <figcaption>
              {items[lightbox].title} — {items[lightbox].category}
            </figcaption>
          </figure>
          <button className="lightbox-nav next" onClick={() => step(1)} aria-label="Next">
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
