import { img } from "../data/photos";

export default function Home() {
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
