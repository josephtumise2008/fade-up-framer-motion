import Sparkle from "../components/Sparkle";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Sparkle className="sparkle" />
          <div className="footer__text">
            <p className="footer__title">FadeUp Motion Lab</p>
            <p className="footer__sub">Built with React + TypeScript + Framer Motion</p>
          </div>
        </div>
      </div>
      <p className="footer__note">
        Made with React, motion, and intention.
      </p>
      <p className="footer__copyright">
        © 2026 · Built by Escript_jose
      </p>
    </footer>
  );
}