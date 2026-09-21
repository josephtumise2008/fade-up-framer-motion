import { useEffect, useRef, useState } from "react";
import CodeWindow from "../components/CodeWindow";
import SectionHeading from "../components/SectionHeading";
import FadeUp from "../components/FadeUp";
import { IconCheck, IconCopy, IconNote } from "../components/icons";
import fadeUpSource from "../lib/fadeUpSource";

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function CopyButton() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fadeUpSource);
    } catch {
      fallbackCopy(fadeUpSource);
    }
    setCopied(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        className={`copy-button${copied ? " copy-button--done" : ""}`}
        onClick={handleCopy}
      >
        {copied ? <IconCheck /> : <IconCopy />}
        {copied ? "Copied!" : "Copy Code"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </>
  );
}

export default function CodeSection() {
  return (
    <section className="section section--code" id="code">
      <div className="container">
        <SectionHeading
          eyebrow="04 / The Component"
          title="FadeUp.tsx"
          description="Small enough to understand. Flexible enough to reuse everywhere."
        />

        <FadeUp delay={0.1} distance={26}>
          <CodeWindow
            code={fadeUpSource}
            filename="FadeUp.tsx"
            theme="dark"
            showCursor={false}
            action={<CopyButton />}
          />
        </FadeUp>

        <FadeUp delay={0.2} distance={16}>
          <p className="code-note">
            <IconNote />
            <span>
              Paste it anywhere, wrap anything — Framer Motion handles the
              viewport detection and the reveal.
            </span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}