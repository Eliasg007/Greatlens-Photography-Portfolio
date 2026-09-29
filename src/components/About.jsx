import SectionHeading from "./SectionHeading";
import { img } from "../data/photos";

export default function About() {
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
