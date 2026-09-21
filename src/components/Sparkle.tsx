import { useId } from "react";

export default function Sparkle({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`sparkle-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F7CFF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5c.75 4.9 3.1 7.25 8 8-4.9.75-7.25 3.1-8 8-.75-4.9-3.1-7.25-8-8 4.9-.75 7.25-3.1 8-8z"
        fill={`url(#sparkle-${id})`}
      />
    </svg>
  );
}