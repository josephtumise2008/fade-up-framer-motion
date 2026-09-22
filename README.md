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
├── sections/     Hero, LiveDemo, HowItWorks, CodeSection, Footer, A11yDemo
├── a11y/         Reusable accessible primitives — see below
├── lib/          fadeUpSource.ts (single source of truth for the displayed/copyable code)
├── App.tsx
├── App.css       component + layout styles
└── index.css     design tokens, ambient glows, reduced-motion rules
```

## A11y kit

`src/a11y/` is a small set of keyboard-first, ARIA-correct reusable
components, demoed in the **A11y Kit** section (`#a11y`):

| Component    | Behavior                                                            |
| ------------ | ------------------------------------------------------------------- |
| `Modal`      | `role="dialog"` + `aria-modal`, focus trap, Escape to close, focus returns to trigger, scroll lock |
| `Dropdown`   | Menu-button pattern, `role="menuitemradio"`, roving tabindex, arrow/Home/End keys, Escape closes |
| `Tabs`       | `role="tablist"`, arrow-key activation, Home/End, focusable active panel |
| `Accordion`  | Disclosure pattern, `aria-expanded` + `inert` collapsed panels      |
| `TextField` `TextArea` `Select` | Labeled controls with `aria-describedby` hint/error and `aria-invalid` |
| `RadioGroup` `Checkbox` `Switch` | Native keyboard behavior, `role="radiogroup"` / `role="switch"`     |

`src/a11y/useFocusTrap.ts` provides the `useFocusTrap` (Tab wrapping + focus
restore) and `useScrollLock` hooks.

## Notes

- Ambient background glows are pure CSS radial gradients — no images.
- Syntax highlighting in `CodeWindow` is a ~100 line tokenizer, no library.
- All animations respect `prefers-reduced-motion`.