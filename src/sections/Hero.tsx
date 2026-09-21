import CodeWindow from "../components/CodeWindow";
import FadeUp from "../components/FadeUp";

const HERO_SNIPPET = `import FadeUp from "../components/FadeUp";

function Intro() {
  return (
    <section>
      <FadeUp delay={0.1}>
        <h1>Make your interface move with intention.</h1>
      </FadeUp>

      <FadeUp delay={0.3}>
        <p>Each child reveals itself on scroll.</p>
      </FadeUp>
    </section>
  );
}`;

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <FadeUp delay={0}>
            <p className="eyebrow hero__eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              Framer Motion / 01
            </p>
          </FadeUp>

          <h1 className="hero__title">
            <FadeUp delay={0.08}>
              <span className="hero__line">Make your interface</span>
            </FadeUp>
            <FadeUp delay={0.18}>
              <span className="hero__line hero__line--phrased">
                <span className="grad-blue">move with</span>{" "}
                <span className="grad-purple">intention.</span>
                <span className="hero__underline" aria-hidden="true" />
              </span>
            </FadeUp>
          </h1>

          <FadeUp delay={0.3} distance={20}>
            <p className="hero__lede">
              A reusable React animation component built with Framer Motion,{" "}
              <span className="chip">useInView</span>, and TypeScript.
            </p>
          </FadeUp>

          <FadeUp delay={0.42} distance={18}>
            <p className="hero__status">
              <span className="status">
                <span className="status__dot" aria-hidden="true" />
                Animation system ready
              </span>
            </p>
          </FadeUp>
        </div>

        <div className="hero__visual">
          <FadeUp delay={0.22} distance={30}>
            <div className="hero__editor-wrap">
              <span className="note note--1" aria-hidden="true">
                Smooth
              </span>
              <span className="note note--2" aria-hidden="true">
                Elegant
              </span>
              <span className="note note--3" aria-hidden="true">
                Reusable
              </span>
              <CodeWindow code={HERO_SNIPPET} filename="Intro.tsx" />
            </div>
          </FadeUp>
          <FadeUp delay={0.42} distance={12}>
            <p className="hero__hint">
              <span aria-hidden="true">▾</span> scroll to trigger the reveal
            </p>
          </FadeUp>
        </div>
      </div>
    </header>
  );
}