import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import { img, workPhotos, journalPhotos } from "./data/photos.js";

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

const STORIES = [
  {
    id: "story-01",
    title: "Between Services",
    dek: "A year inside three churches preparing for Sunday, told through the hour before the doors open.",
  },
  {
    id: "story-02",
    title: "Okada",
    dek: "Portraits of Lagos motorcycle riders, shot at the stands where they wait between fares.",
  },
  {
    id: "story-03",
    title: "What the Market Keeps",
    dek: "Three generations of one family selling fabric at Balogun Market.",
  },
];

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
  const photo = img("hero");
  return (
    <section id="home" className="section hero">
      <img className="hero-image" src={photo.src} alt={photo.alt} />
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

function Stories() {
  return (
    <section id="stories" className="section">
      <SectionHeading num="03" title="Stories" sub="Long-form photographic projects" />
      <div className="stories-list">
        {STORIES.map((s) => {
          const photo = img(s.id);
          return (
            <article className="story" key={s.id}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="story-copy">
                <h3>{s.title}</h3>
                <p>{s.dek}</p>
                <span className="story-link">Read the story</span>
              </div>
            </article>
          );
        })}
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
        {journalPhotos.map((item) => {
          const photo = img(item.id);
          return (
            <img key={photo.id} src={photo.src} alt={photo.alt} loading="lazy" />
          );
        })}
      </div>
    </section>
  );
}

function About() {
  const photo = img("about");
  return (
    <section id="about" className="section about">
      <img className="about-portrait" src={photo.src} alt={photo.alt} />
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
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section contact">
      <SectionHeading num="07" title="Contact" sub="Booking / inquiry" />
      {sent ? (
        <p className="contact-confirm">
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
          <button type="submit" className="submit">
            Send inquiry
          </button>
        </form>
      )}
      <div className="contact-direct">
        <a href="mailto:hello@greatlens.co">hello@greatlens.co</a>
        <div className="socials">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="YouTube">YouTube</a>
          <a href="#" aria-label="TikTok">TikTok</a>
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
