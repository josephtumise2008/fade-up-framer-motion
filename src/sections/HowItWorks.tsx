import FadeUp from "../components/FadeUp";
import SectionHeading from "../components/SectionHeading";
import {
  IconChevron,
  IconDiv,
  IconReveal,
  IconTarget,
  IconViewport,
} from "../components/icons";

interface Stage {
  number: string;
  name: string;
  detail: string;
  iconClass: "blue" | "lavender" | "cyan" | "purple";
}

const STAGES: Stage[] = [
  {
    number: "01",
    name: "useRef",
    iconClass: "blue",
    detail: "A reference points to the element we want to observe.",
  },
  {
    number: "02",
    name: "useInView",
    iconClass: "lavender",
    detail: "Detects when the element enters the viewport.",
  },
  {
    number: "03",
    name: "motion.div",
    iconClass: "cyan",
    detail: "Controls the transition from hidden to visible.",
  },
  {
    number: "04",
    name: "Reveal",
    iconClass: "purple",
    detail: "Fades and translates up with a smooth effect.",
  },
];

const ICONS: Record<Stage["iconClass"], typeof IconTarget> = {
  blue: IconTarget,
  lavender: IconViewport,
  cyan: IconDiv,
  purple: IconReveal,
};

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <SectionHeading
          eyebrow="03 / How It Works"
          title="What's actually happening?"
          description="FadeUp uses React's useRef and Framer Motion's useInView to trigger a smooth fade + upward motion when the element enters the viewport."
        />

        <div className="process">
          {STAGES.map((stage, i) => {
            const Glyph = ICONS[stage.iconClass];
            const isLast = i === STAGES.length - 1;
            return (
              <div className="process__unit" key={stage.number}>
                <FadeUp delay={i * 0.12} distance={24}>
                  <article className="proc-card">
                    <span className={`proc-card__icon proc-card__icon--${stage.iconClass}`}>
                      <Glyph />
                    </span>
                    <div>
                      <span className="demo-card__number" aria-hidden="true">
                        {stage.number}
                      </span>
                      <h3 className="proc-card__name">{stage.name}</h3>
                    </div>
                    <p className="proc-card__detail">{stage.detail}</p>
                  </article>
                </FadeUp>
                {!isLast && (
                  <span className="process__arrow" aria-hidden="true">
                    <IconChevron />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}