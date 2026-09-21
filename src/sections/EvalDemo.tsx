import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "../components/FadeUp";
import SectionHeading from "../components/SectionHeading";
import { IconCheck } from "../components/icons";

type Pick = "A" | "tie" | "B" | null;

interface Criterion {
  id: string;
  label: string;
  hint: string;
  expected: Exclude<Pick, null>;
}

const CRITERIA: Criterion[] = [
  { id: "accuracy", label: "Accuracy", hint: "Factually correct claims", expected: "B" },
  { id: "clarity", label: "Clarity", hint: "Clear, well-structured read", expected: "B" },
  { id: "helpfulness", label: "Helpfulness", hint: "Fully answers the question", expected: "B" },
  {
    id: "safety",
    label: "Safety & reliability",
    hint: "No misleading claims; flags uncertainty",
    expected: "B",
  },
];

const PROMPT = `Task: Answer the question accurately. Cite a source for any factual claim and flag uncertainty. Keep the answer under 150 words.

Question: "What is the capital of Australia, and roughly how many people live there?"`;

const RESPONSE_A = `The capital of Australia is Sydney. It's the country's biggest city, home to about 5.3 million people, and where most international visitors arrive.`;

const RESPONSE_B = `Canberra is the capital of Australia. Unlike coastal cities like Sydney or Melbourne, it was purpose-built inland as the seat of government. Its population is roughly 450,000. A common misconception: Sydney is the largest city and the capital of New South Wales, but it is not the national capital.`;

const OPTIONS: Exclude<Pick, null>[] = ["A", "tie", "B"];

function Seg({
  value,
  onChange,
  size = "md",
}: {
  value: Pick;
  onChange: (v: Exclude<Pick, null>) => void;
  size?: "md" | "lg";
}) {
  return (
    <span
      className={`seg seg--${size}`}
      role="radiogroup"
      aria-label="Choose response"
    >
      {OPTIONS.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          className={`seg__opt${value === o ? ` seg__opt--on seg__opt--${o}` : ""}`}
          onClick={() => onChange(o)}
        >
          {o === "tie" ? "Tie" : `Response ${o}`}
        </button>
      ))}
    </span>
  );
}

export default function EvalDemo() {
  const [picks, setPicks] = useState<Record<string, Pick>>({});
  const [overall, setOverall] = useState<Pick>(null);
  const [submitted, setSubmitted] = useState(false);

  const answered = CRITERIA.every((c) => picks[c.id]) && overall !== null;

  const results = CRITERIA.map((c) => ({
    ...c,
    match: (picks[c.id] ?? "") === c.expected,
  }));
  const matched = results.filter((r) => r.match).length;
  const overallMatch = overall === "B";
  const agreement = Math.round(((matched + (overallMatch ? 1 : 0)) / (CRITERIA.length + 1)) * 100);

  const verdict = overallMatch
    ? "Response B wins — every rubric criterion agrees with the reference judgment."
    : matched >= 2
      ? "The rubric points to Response B, but your overall call differed from the reference. Re-read the safety criterion."
      : "The reference favors Response B. The rubric rewards accuracy over confident misinformation.";

  const setPick = (id: string, value: Exclude<Pick, null>) =>
    setPicks((p) => ({ ...p, [id]: value }));

  const reset = () => {
    setPicks({});
    setOverall(null);
    setSubmitted(false);
  };

  return (
    <section className="section" id="judge">
      <div className="container">
        <SectionHeading
          eyebrow="06 / Live Judgment"
          title="You're in the reviewer seat."
          description="Read the task, compare two responses, apply the rubric, then submit — and see how your judgment lands against a reference."
        />

        <FadeUp delay={0.1} distance={26}>
          <div className="judge">
            <div className="judge__block-label">Task</div>
            <div className="judge__prompt">
              {PROMPT.split("\n").map((line, i) => (
                <p key={i}>{line || "\u00A0"}</p>
              ))}
            </div>

            <div className="judge__responses">
              <article className="response-card">
                <div className="response-card__head">
                  <span className="response-card__badge">A</span>
                  <span className="response-card__name">Response A</span>
                </div>
                <div className="response-card__body">{RESPONSE_A}</div>
              </article>
              <article className="response-card response-card--strong">
                <div className="response-card__head">
                  <span className="response-card__badge">B</span>
                  <span className="response-card__name">Response B</span>
                </div>
                <div className="response-card__body">{RESPONSE_B}</div>
              </article>
            </div>

            <div className="judge__rubric">
              <div className="judge__block-label">Rubric</div>
              {CRITERIA.map((c) => (
                <div className="rubric-row" key={c.id}>
                  <div className="rubric-row__label">
                    <span>{c.label}</span>
                    <small>{c.hint}</small>
                  </div>
                  <Seg value={picks[c.id] ?? null} onChange={(v) => setPick(c.id, v)} />
                </div>
              ))}
            </div>

            <div className="judge__overall">
              <div className="judge__block-label">Overall judgment</div>
              <div className="judge__prompt-final">
                <span>Which response is better overall?</span>
                <Seg size="lg" value={overall} onChange={setOverall} />
              </div>
            </div>

            <div className="judge__actions">
              <button
                type="button"
                className="judge__submit"
                disabled={!answered}
                onClick={() => setSubmitted(true)}
              >
                Submit judgment
              </button>
              <button type="button" className="judge__reset" onClick={reset}>
                Reset
              </button>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="result__score">{agreement}%</div>
                  <div className="result__meta">
                    <div className="result__title">Agreement with reference judgment</div>
                    <div className="result__chips">
                      {results.map((r) => (
                        <span
                          key={r.id}
                          className={`result__chip${r.match ? " result__chip--ok" : " result__chip--no"}`}
                        >
                          {r.match ? <IconCheck /> : "✕"}
                          {r.label} · {picks[r.id]}
                        </span>
                      ))}
                      <span
                        className={`result__chip${overallMatch ? " result__chip--ok" : " result__chip--no"}`}
                      >
                        {overallMatch ? <IconCheck /> : "✕"} Overall · {overall}
                      </span>
                    </div>
                    <p className="result__verdict">{verdict}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}