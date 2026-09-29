import SectionHeading from "./SectionHeading";
import { img } from "../data/photos";
import { STORIES_CONTENT } from "../data/content";

export default function Stories() {
  return (
    <section id="stories" className="section">
      <SectionHeading num="03" title="Stories" sub="Long-form photographic projects" />
      <div className="stories-list">
        {STORIES_CONTENT.map((s) => {
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
