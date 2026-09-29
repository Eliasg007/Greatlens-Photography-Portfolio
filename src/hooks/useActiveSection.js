import { useState, useEffect, useRef } from "react";
import { NAV } from "../data/content";

export function useActiveSection() {
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

  return { active, navigate };
}
