import FadeUp from "./FadeUp";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <FadeUp delay={0}>
        <span className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          {eyebrow}
        </span>
      </FadeUp>
      <FadeUp delay={0.08}>
        <h2 className="section-heading__title">{title}</h2>
      </FadeUp>
      {description && (
        <FadeUp delay={0.16} distance={20}>
          <p className="section-heading__description">{description}</p>
        </FadeUp>
      )}
    </div>
  );
}