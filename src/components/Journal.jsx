import SectionHeading from "./SectionHeading";
import { img, journalPhotos } from "../data/photos";

export default function Journal() {
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
