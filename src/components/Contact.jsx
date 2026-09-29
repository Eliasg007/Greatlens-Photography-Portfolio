import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { SERVICES } from "../data/content";

export default function Contact() {
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
