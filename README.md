# FadeUp Motion Lab

A polished, interactive demo of the `FadeUp` scroll-reveal component —
a single reusable React animation primitive built on Framer Motion.

Built with **React + TypeScript + Vite + Framer Motion**. A light
blue + lavender visual identity, hand-rolled syntax highlighting, and no UI
framework or icon library.

## Getting started

```bash
npm install
npm run dev
```

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the Vite dev server      |
| `npm run build`   | Type-check + production build  |
| `npm run lint`    | Run ESLint                     |
| `npm run preview` | Preview the production build   |

## The component

`src/components/FadeUp.tsx` — the whole library:

```tsx
<FadeUp delay={0.2} distance={40} className="my-block">
  Anything you want to reveal on scroll.
</FadeUp>
```

- Uses `useRef` to point at the element.
- Uses `useInView({ once: true, margin: "-100px" })` to detect when it enters
  the viewport.
- Uses `motion.div` to fade it up from `opacity: 0`.
- Respects `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.

## Structure

```text
src/
├── components/   FadeUp, CodeWindow (mini syntax highlighter), Nav, Sparkle, DemoCard,
│                 SectionHeading, icons, Cursor
├── sections/     Hero, LiveDemo, HowItWorks, CodeSection, Footer
├── lib/          fadeUpSource.ts (single source of truth for the displayed/copyable code)
├── App.tsx
├── App.css       component + layout styles
└── index.css     design tokens, ambient glows, reduced-motion rules
```

## Notes

- Ambient background glows are pure CSS radial gradients — no images.
- Syntax highlighting in `CodeWindow` is a ~100 line tokenizer, no library.
- All animations respect `prefers-reduced-motion`.