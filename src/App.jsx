import { useState, useEffect, useRef, useCallback } from "react";
import "./styles/App.css";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: "home", num: "01", label: "Home" },
  { id: "work", num: "02", label: "Work" },
  { id: "stories", num: "03", label: "Stories" },
  { id: "journal", num: "04", label: "365" },
  { id: "about", num: "05", label: "About" },
  { id: "services", num: "06", label: "Services" },
  { id: "contact", num: "07", label: "Contact" },
];

const CATEGORIES = ["All", "Portraits", "Documentary", "Events", "Faith", "Commercial"];

function photoData(filename, alt, available = false) {
  return {
    src800: `/photos/${filename}-800.webp`,
    src2000: `/photos/${filename}-2000.webp`,
    alt,
    available,
  };
}

const HERO_IMAGE = photoData("eli-78", "Featured GREATLENS photograph", true);
const ABOUT_IMAGE = photoData("ppoe", "Portrait of the photographer", true);

// Set available to true after adding originals/<filename> and running npm run optimize-images.
const WORK_ITEMS = [
  { id: 1, category: "Portraits", title: "Amara, Studio Light", ratio: "portrait", image: photoData("amara-studio-light", "Portrait of Amara in studio light") },
  { id: 2, category: "Documentary", title: "Morning Market, Lagos", ratio: "landscape", image: photoData("morning-market-lagos", "Market vendors and customers in Lagos") },
  { id: 3, category: "Events", title: "The Adeyemi Wedding", ratio: "landscape", image: photoData("adeyemi-wedding", "The Adeyemi wedding celebration") },
  { id: 4, category: "Faith", title: "Sunday, First Light", ratio: "portrait", image: photoData("sunday-first-light", "A church prepared for Sunday morning") },
  { id: 5, category: "Commercial", title: "Aso-Oke Textiles", ratio: "square", image: photoData("aso-oke-textiles", "Aso-Oke fabric textile detail") },
  { id: 6, category: "Portraits", title: "David, Backstage", ratio: "portrait", image: photoData("david-backstage", "Portrait of David backstage") },
  { id: 7, category: "Documentary", title: "Fishermen, Badagry", ratio: "landscape", image: photoData("fishermen-badagry", "Fishermen working in Badagry") },
  { id: 8, category: "Faith", title: "Baptism, River Road", ratio: "landscape", image: photoData("baptism-river-road", "A baptism at River Road") },
  { id: 9, category: "Events", title: "Convocation Day", ratio: "square", image: photoData("convocation-day", "Graduates celebrating convocation") },
  { id: 10, category: "Commercial", title: "Néné Skincare Campaign", ratio: "portrait", image: photoData("nene-skincare-campaign", "Néné skincare product campaign") },
  { id: 11, category: "Portraits", title: "Chidi, Window Light", ratio: "square", image: photoData("chidi-window-light", "Portrait of Chidi in window light") },
  { id: 12, category: "Documentary", title: "Bus Stop, Rainy Season", ratio: "landscape", image: photoData("bus-stop-rainy-season", "Commuters waiting at a bus stop in the rain") },
];

const STORIES = [
  {
    id: 1,
    title: "Between Services",
    dek: "A year inside three churches preparing for Sunday, told through the hour before the doors open.",
    image: photoData("between-services", "A church interior before Sunday service"),
  },
  {
    id: 2,
    title: "Okada",
    dek: "Portraits of Lagos motorcycle riders, shot at the stands where they wait between fares.",
    image: photoData("okada", "Lagos motorcycle riders waiting between fares"),
  },
  {
    id: 3,
    title: "What the Market Keeps",
    dek: "Three generations of one family selling fabric at Balogun Market.",
    image: photoData("what-the-market-keeps", "A family selling fabric at Balogun Market"),
  },
];

const JOURNAL_ITEMS = Array.from({ length: 24 }, (_, index) => {
  const day = index + 1;
  const filename = `journal-${String(day).padStart(2, "0")}`;
  return {
    id: day,
    image: photoData(filename, `Journal photograph for day ${day}`),
  };
});

const SERVICES = [
  {
    title: "Photography",
    body: "Portrait sessions, events, editorial and commercial shoots — delivered fully edited.",
  },
  {
    title: "Videography",
    body: "Short-form documentary, event coverage, and brand video from concept to final cut.",
  },
  {
    title: "Livestreaming",
    body: "Multi-camera livestream production for services, ceremonies, and conferences.",
  },
  {
    title: "Media Direction",
    body: "Ongoing content strategy and shoot planning for brands and ministries.",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function Photo({ image, size = 800, className, ...imgProps }) {
  if (!image.available) {
    return (
      <div
        className={`photo-placeholder ${className ?? ""}`}
        role="img"
        aria-label={`Photo pending: ${image.alt}`}
      >
        Photo pending
      </div>
    );
  }

  return (
    <img
      {...imgProps}
      className={className}
      src={size > 800 ? image.src2000 : image.src800}
      alt={image.alt}
    />
  );
}

function ratioSize(ratio) {
  switch (ratio) {
    case "landscape":
      return [1000, 700];
    case "square":
      return [800, 800];
    default:
      return [800, 1000];
  }
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */

function Nav({ active, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleClick = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      <nav className="rail" aria-label="Section navigation">
        <div className="rail-mark">GL</div>
        <ul>
          {NAV.map((item) => (
            <li key={item.id}>
              <button
                className={active === item.id ? "rail-link active" : "rail-link"}
                onClick={() => handleClick(item.id)}
              >
                <span className="rail-num">{item.num}</span>
                <span className="rail-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="topbar">
        <span className="topbar-mark">GREATLENS</span>
        <button
          className="topbar-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => handleClick(item.id)}>
              <span className="rail-num">{item.num}</span> {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */

function Home() {
  return (
    <section id="home" className="section hero">
      <Photo
        image={HERO_IMAGE}
        size={2000}
        className="hero-image"
        width="1645"
        height="1033"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-copy">
        <p className="eyebrow">GREATLENS</p>
        <h1>
          Photographs that
          <br />
          hold still light.
        </h1>
        <p className="hero-sub">
          Portrait, documentary, and event photography based in Lagos —
          made for people who want to be looked at honestly.
        </p>
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const items =
    filter === "All" ? WORK_ITEMS : WORK_ITEMS.filter((i) => i.category === filter);

  const isLightboxOpen = lightbox !== null;
  const openAt = (index, trigger) => {
    triggerRef.current = trigger;
    setLightbox(index);
  };
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
    if (!isLightboxOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      triggerRef.current?.focus();
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
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
          const [w, h] = ratioSize(item.ratio);
          return (
            <button
              key={item.id}
              className={`work-item ratio-${item.ratio}`}
              onClick={(event) => openAt(i, event.currentTarget)}
            >
              <Photo
                image={item.image}
                size={w}
                className="work-photo"
                width={w}
                height={h}
                loading="lazy"
                decoding="async"
              />
              <span className="work-item-overlay">
                <span className="work-item-title">{item.title}</span>
                <span className="work-item-cat">{item.category}</span>
              </span>
            </button>
          );
        })}
      </div>

      {lightbox !== null && (
        <dialog
          ref={dialogRef}
          className="lightbox"
          aria-labelledby="lightbox-caption"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <button
            ref={closeButtonRef}
            className="lightbox-close"
            onClick={close}
            aria-label="Close photo viewer"
          >
            &times;
          </button>
          <button className="lightbox-nav prev" onClick={() => step(-1)} aria-label="Previous">
            &#8249;
          </button>
          <figure>
            <Photo
              image={items[lightbox].image}
              size={2000}
              className="lightbox-photo"
              width="1645"
              height="1033"
              loading="lazy"
              decoding="async"
            />
            <figcaption id="lightbox-caption">
              {items[lightbox].title} — {items[lightbox].category}
            </figcaption>
          </figure>
          <button className="lightbox-nav next" onClick={() => step(1)} aria-label="Next">
            &#8250;
          </button>
        </dialog>
      )}
    </section>
  );
}

function Stories() {
  return (
    <section id="stories" className="section">
      <SectionHeading num="03" title="Stories" sub="Long-form photographic projects" />
      <div className="stories-list">
        {STORIES.map((s) => (
          <article className="story" key={s.id}>
            <Photo
              image={s.image}
              size={1200}
              className="story-photo"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <div className="story-copy">
              <h3>{s.title}</h3>
              <p>{s.dek}</p>
              <span className="story-link">Read the story</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="section">
      <SectionHeading num="04" title="365" sub="Personal photographic journal" />
      <p className="journal-note">
        One frame at a time — a running log, not a highlight reel.
      </p>
      <div className="journal-grid">
        {JOURNAL_ITEMS.map((item) => (
          <Photo
            key={item.id}
            image={item.image}
            className="journal-photo"
            size={800}
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <Photo
        image={ABOUT_IMAGE}
        size={800}
        className="about-portrait"
        width="800"
        height="1000"
        loading="lazy"
        decoding="async"
      />
      <div className="about-copy">
        <SectionHeading num="05" title="About" sub="Your story + GREATLENS philosophy" />
        <p>
          GREATLENS began with a simple conviction: a photograph should tell the
          truth about a moment, not flatter it. Every session, service, or story
          published here starts from that same place — close attention, patient
          light, and a refusal to rush the picture.
        </p>
        <p>
          Based in Lagos and working across Nigeria, GREATLENS photographs people
          in the middle of their real lives — at church, at work, at weddings,
          and in the in-between hours nobody thinks to document.
        </p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading num="06" title="Services" sub="Photography, videography, livestreaming, media" />
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("https://formsubmit.co/ajax/greatlensphotos@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New GREATLENS inquiry",
        }),
      });
      const result = await response.json();

      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error(result.message || "Inquiry submission failed");
      }

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact">
      <SectionHeading num="07" title="Contact" sub="Booking / inquiry" />
      {status === "sent" ? (
        <p className="contact-confirm" role="status" aria-live="polite">
          Thank you — your inquiry has been received. Expect a reply within two
          business days.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="service">Service</label>
            <select id="service" name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required />
          </div>
          {status === "error" && (
            <p className="contact-error" role="alert">
              Your inquiry could not be sent. Please try again or email us directly.
            </p>
          )}
          <button type="submit" className="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send inquiry"}
          </button>
        </form>
      )}
      <div className="contact-direct">
        <a href="mailto:greatlensphotos@gmail.com">greatlensphotos@gmail.com</a>
        <div className="socials">
          <a href="https://www.instagram.com/_greatlens/" aria-label="Instagram" title="Instagram" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="social-icon-dot" cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@elijahgegeli" aria-label="TikTok" title="TikTok" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 3h3c.2 2.1 1.5 3.8 3.5 4.5v3.2a9 9 0 0 1-3.5-1.3v6.2a6 6 0 1 1-6-6c.4 0 .7 0 1 .1v3.3a2.8 2.8 0 1 0 1.9 2.6V3Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ num, title, sub }) {
  return (
    <header className="section-heading">
      <span className="section-num">{num}</span>
      <div>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */

export default function App() {
  const [active, setActive] = useState("home");
  const observers = useRef({});

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    observers.current.io = io;
    return () => io.disconnect();
  }, []);

  const navigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <Nav active={active} onNavigate={navigate} />
      <main>
        <Home />
        <Work />
        <Stories />
        <Journal />
        <About />
        <Services />
        <Contact />
      </main>
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} GREATLENS</span>
        <button onClick={() => navigate("home")}>Back to top</button>
      </footer>
    </div>
  );
}