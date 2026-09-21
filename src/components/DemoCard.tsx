import {
  IconAtom,
  IconBrackets,
  IconHash,
  IconSparkle,
} from "./icons";

export type DemoIcon = "html" | "css" | "react" | "motion";

const ICONS: Record<DemoIcon, { color: string; Glyph: typeof IconBrackets }> =
  {
    html: { color: "blue", Glyph: IconBrackets },
    css: { color: "purple", Glyph: IconHash },
    react: { color: "cyan", Glyph: IconAtom },
    motion: { color: "indigo", Glyph: IconSparkle },
  };

interface DemoCardProps {
  number: string;
  title: string;
  description: string;
  icon: DemoIcon;
}

export default function DemoCard({
  number,
  title,
  description,
  icon,
}: DemoCardProps) {
  const { color, Glyph } = ICONS[icon];
  return (
    <article className="demo-card">
      <div className="demo-card__top">
        <span className={`demo-card__icon demo-card__icon--${color}`}>
          <Glyph />
        </span>
        <span className="demo-card__number" aria-hidden="true">
          {number}
        </span>
      </div>
      <h3 className="demo-card__title">{title}</h3>
      <p className="demo-card__description">{description}</p>
    </article>
  );
}