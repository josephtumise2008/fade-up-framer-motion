import DemoCard, { type DemoIcon } from "../components/DemoCard";
import FadeUp from "../components/FadeUp";
import SectionHeading from "../components/SectionHeading";

interface CardData {
  number: string;
  title: string;
  description: string;
  icon: DemoIcon;
  delay: number;
}

const CARDS: CardData[] = [
  {
    number: "01",
    title: "HTML",
    description: "Structure",
    icon: "html",
    delay: 0.1,
  },
  {
    number: "02",
    title: "CSS",
    description: "Style",
    icon: "css",
    delay: 0.2,
  },
  {
    number: "03",
    title: "React",
    description: "Components",
    icon: "react",
    delay: 0.3,
  },
  {
    number: "04",
    title: "Motion",
    description: "Interaction",
    icon: "motion",
    delay: 0.4,
  },
];

export default function LiveDemo() {
  return (
    <section className="section section--demo" id="demo">
      <div className="container">
        <SectionHeading
          eyebrow="02 / Live Demo"
          title="See it in motion."
          description="Scroll down and watch each element reveal itself using the same reusable component."
          align="center"
        />

        <div className="demo-grid">
          {CARDS.map((card) => (
            <FadeUp key={card.number} delay={card.delay} className="demo-card__fade">
              <DemoCard
                number={card.number}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15} distance={16}>
          <div className="demo-pattern" role="note" aria-label="usage pattern">
            <span className="demo-pattern__label">the pattern</span>
            <code className="demo-pattern__code">
              {"<FadeUp delay={0.3}>"} your content {"</FadeUp>"}
            </code>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}