import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sparkle from "./Sparkle";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "How it works", href: "#how" },
  { label: "The Component", href: "#code" },
  { label: "Live Demo", href: "#demo" },
  { label: "AI Skills", href: "#skills" },
  { label: "Judging", href: "#judge" },
];

export default function Nav() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const select = (label: string) => {
    setActive(label);
    setOpen(false);
  };

  return (
    <nav className="nav" aria-label="Primary">
      <div className="container nav__inner">
        <a className="nav__brand" href="#top">
          <Sparkle className="sparkle" />
          <span>FadeUp Motion Lab</span>
        </a>

        <ul className="nav__links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                className={`nav__link${active === link.label ? " nav__link--active" : ""}`}
                href={link.href}
                onClick={() => select(link.label)}
                aria-current={active === link.label ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            style={{ width: 20, height: 20 }}
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            className="nav__mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  className={`nav__link${active === link.label ? " nav__link--active" : ""}`}
                  href={link.href}
                  onClick={() => select(link.label)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}