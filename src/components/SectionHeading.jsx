export default function SectionHeading({ num, title, sub }) {
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
