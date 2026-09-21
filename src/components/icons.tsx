interface IconProps {
  className?: string;
}

function Svg({
  className,
  children,
  filled = false,
}: IconProps & { children: React.ReactNode; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconBrackets({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 6.5 4.5 12 9 17.5" />
      <path d="M15 6.5 19.5 12 15 17.5" />
    </Svg>
  );
}

export function IconHash({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 9h14M5 15h14" />
      <path d="M9.6 4 7 20M17 4l-2.6 16" />
    </Svg>
  );
}

export function IconAtom({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="2.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </Svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 3c.7 4.5 2.8 6.6 7.3 7.3-4.5.7-6.6 2.8-7.3 7.3-.7-4.5-2.8-6.6-7.3-7.3 4.5-.7 6.6-2.8 7.3-7.3z" />
      <path d="M19.4 15.5c.3 2 1.3 3 3.1 3.3-1.8.3-2.8 1.3-3.1 3.1-.3-1.8-1.3-2.8-3.1-3.1 1.8-.3 2.8-1.3 3.1-3.3z" />
    </svg>
  );
}

export function IconTarget({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </Svg>
  );
}

export function IconViewport({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M12 9v6" />
      <path d="M9 12l3 3 3-3" />
    </Svg>
  );
}

export function IconDiv({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="6" y="8" width="12" height="8" rx="2" />
      <path d="M12 4v4M12 16v4" />
      <path d="M8 12h8" />
    </Svg>
  );
}

export function IconReveal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 3c.8 5 3.2 7.4 8.2 8.2-5 .8-7.4 3.2-8.2 8.2-.8-5-3.2-7.4-8.2-8.2 5-.8 7.4-3.2 8.2-8.2z" />
    </svg>
  );
}

export function IconChevron({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 5l7 7-7 7" />
    </Svg>
  );
}

export function IconCopy({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </Svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </Svg>
  );
}

export function IconNote({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8l7-7V6a2 2 0 0 0-2-2h-4" />
      <path d="M13 20v-5h5" />
    </Svg>
  );
}

export function IconLightbulb({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
    </Svg>
  );
}

export function IconScale({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3v18" />
      <path d="M8 21h8" />
      <path d="M4 7h16" />
      <path d="m6 7-3 6a3 3 0 0 0 6 0L6 7z" />
      <path d="m18 7-3 6a3 3 0 0 0 6 0l-3-6z" />
    </Svg>
  );
}

export function IconDatabase({ className }: IconProps) {
  return (
    <Svg className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </Svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3l7 3v6c0 4.4-3.2 7.9-7 9-3.8-1.1-7-4.6-7-9V6l7-3z" />
    </Svg>
  );
}

export function IconThumbsUp({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.3a2 2 0 0 0 2-1.7l1.2-7a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2" />
    </Svg>
  );
}