import FadeUp from "../components/FadeUp";
import SectionHeading from "../components/SectionHeading";
import {
  IconDatabase,
  IconLightbulb,
  IconScale,
  IconShield,
  IconTarget,
  IconThumbsUp,
} from "../components/icons";

type Tone = "blue" | "purple" | "cyan" | "indigo";

interface Skill {
  icon: typeof IconLightbulb;
  tone: Tone;
  title: string;
  text: string;
}

const SKILLS: Skill[] = [
  {
    icon: IconLightbulb,
    tone: "blue",
    title: "Prompt Engineering",
    text: "Write precise, task-specific prompts that get models to follow instructions cleanly on the first pass.",
  },
  {
    icon: IconScale,
    tone: "purple",
    title: "Rubric Evaluation",
    text: "Judge outputs against rubrics — accuracy, completeness, tone, formatting — and write the reasoning behind each score.",
  },
  {
    icon: IconTarget,
    tone: "cyan",
    title: "Quality Spotting",
    text: "Catch hallucinations, off-spec output, and unverifiable claims before they reach the end user.",
  },
  {
    icon: IconShield,
    tone: "indigo",
    title: "Safety & Alignment",
    text: "Flag toxic, biased, or policy-violating generations with calm, evidence-based explanations.",
  },
  {
    icon: IconDatabase,
    tone: "blue",
    title: "Data Curation",
    text: "Shape noisy generations into clean, high-signal examples that make fine-tuning more efficient.",
  },
  {
    icon: IconThumbsUp,
    tone: "cyan",
    title: "Side-by-Side Judgment",
    text: "Compare candidate responses, justify the ranking, and point to the exact line that made the difference.",
  },
];

export default function SkillsSection() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="05 / AI Skill Set"
          title="The skills that make the model better."
          description="A snapshot of the AI-data craft: careful prompts, strict rubrics, and honest, evidence-backed judgments."
        />

        <div className="skills-grid">
          {SKILLS.map((skill, i) => {
            const Glyph = skill.icon;
            return (
              <FadeUp key={skill.title} delay={i * 0.07} distance={24}>
                <article className="skill-card">
                  <div className="skill-card__top">
                    <span className={`skill-card__icon skill-card__icon--${skill.tone}`}>
                      <Glyph />
                    </span>
                    <span className="skill-card__number" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="skill-card__title">{skill.title}</h3>
                  <p className="skill-card__description">{skill.text}</p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}