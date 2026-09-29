import SectionHeading from "./SectionHeading";
import { SERVICES } from "../data/content";

export default function Services() {
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
