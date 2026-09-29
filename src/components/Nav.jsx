import { useState } from "react";
import { NAV } from "../data/content";

export default function Nav({ active, onNavigate }) {
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
