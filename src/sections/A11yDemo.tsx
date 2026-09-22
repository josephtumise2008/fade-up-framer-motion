import { useState, type FormEvent, type ReactNode } from "react";
import FadeUp from "../components/FadeUp";
import SectionHeading from "../components/SectionHeading";
import {
  Accordion,
  Checkbox,
  Dropdown,
  Modal,
  RadioGroup,
  Select,
  Tabs,
  TextField,
  type DropdownOption,
  type TabDef,
} from "../a11y";

type Plan = "basic" | "pro" | "enterprise";

const PLANS: DropdownOption<Plan>[] = [
  { value: "basic", label: "Basic — $0" },
  { value: "pro", label: "Pro — $24/mo" },
  { value: "enterprise", label: "Enterprise — custom" },
];

const TABS: TabDef[] = [
  {
    id: "motion",
    label: "Motion",
    content: (
      <p>
        FadeUp is a single scroll-reveal primitive. Motion stays declarative — a
        <code className="chip">motion.div</code> animates from <code className="chip">opacity: 0</code>,{" "}
        <code className="chip">y: distance</code> to visible as the element enters the viewport.
      </p>
    ),
  },
  {
    id: "scroll",
    label: "Scroll",
    content: (
      <p>
        <code className="chip">useInView</code> fires the reveal once with a{" "}
        <code className="chip">-100px</code> margin, and{" "}
        <code className="chip">MotionConfig reducedMotion="user"</code> disables
        movement for users who prefer reduced motion.
      </p>
    ),
  },
  {
    id: "aria",
    label: "ARIA",
    content: (
      <p>
        This kit handles the semantics for you: dialogs get focus traps,
        menus expose <code className="chip">aria-expanded</code>, tabs use roving
        tabindex, and every control pairs a label with{" "}
        <code className="chip">aria-describedby</code>.
      </p>
    ),
  },
];

function KeyHint({ keys }: { keys: string[] }) {
  return (
    <div className="a11y-card__keys" aria-hidden="true">
      {keys.map((key) => (
        <kbd key={key} className="a11y-kbd">
          {key}
        </kbd>
      ))}
    </div>
  );
}

interface PanelProps {
  title: string;
  note: string;
  keys: string[];
  children: ReactNode;
}

function Panel({ title, note, keys, children }: PanelProps) {
  return (
    <article className="a11y-card">
      <div className="a11y-card__head">
        <h3 className="a11y-card__title">{title}</h3>
        <KeyHint keys={keys} />
      </div>
      <div className="a11y-card__stage">{children}</div>
      <p className="a11y-card__note">{note}</p>
    </article>
  );
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function A11yDemo() {
  const [plan, setPlan] = useState<Plan>("basic");
  const [modalOpen, setModalOpen] = useState(false);
  const [remember, setRemember] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("engineer");
  const [newsletter, setNewsletter] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [done, setDone] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
    else setDone(false);
  };

  const resetForm = () => {
    setErrors({});
    setDone(false);
  };

  return (
    <section className="section section--a11y" id="a11y">
      <div className="container">
        <SectionHeading
          eyebrow="06 / Accessibility"
          title="A component kit that does the right thing."
          description="Small, reusable primitives — modal, dropdown, tabs, accordion, form inputs — built keyboard-first with proper ARIA roles, focus traps, and roving tabindex."
        />

        <div className="a11y-grid">
          <FadeUp delay={0} distance={24}>
            <Panel
              title="Dropdown"
              note="A menu button with roving tabindex. Arrows move, Enter selects, Escape returns focus to the trigger."
              keys={["↑", "↓", "Enter", "Esc"]}
            >
              <Dropdown
                label="Choose a plan"
                options={PLANS}
                value={plan}
                onChange={setPlan}
              />
            </Panel>
          </FadeUp>

          <FadeUp delay={0.05} distance={24}>
            <Panel
              title="Tabs"
              note="Arrow keys switch panels with automatic activation; Home and End jump to the edges of the tab list."
              keys={["←", "→", "Home", "End"]}
            >
              <Tabs label="Kit highlights" tabs={TABS} defaultIndex={0} />
            </Panel>
          </FadeUp>

          <FadeUp delay={0.1} distance={24}>
            <Panel
              title="Accordion"
              note="Disclosures toggled with Enter or Space; collapsed panels are inert and invisible to assistive tech."
              keys={["Enter", "Space", "Tab"]}
            >
              <Accordion
                items={[
                  {
                    id: "divs",
                    title: "Why not just build it with divs?",
                    content:
                      "Native roles (button, tablist, dialog) give screen readers a predictable contract — arrow key conventions, selected state, and announced names are free.",
                  },
                  {
                    id: "test",
                    title: "How do I test keyboard support?",
                    content:
                      "Tab through once: every control must be reachable, focus must be visible, and Escape/arrows must behave as this page documents.",
                  },
                  {
                    id: "motion",
                    title: "What about reduced motion?",
                    content:
                      "FadeUp respects prefers-reduced-motion via MotionConfig, and the kit's transitions are measured in milliseconds — no parallax, no drift.",
                  },
                ]}
              />
            </Panel>
          </FadeUp>

          <FadeUp delay={0.15} distance={24}>
            <Panel
              title="Modal"
              note="Focus is trapped inside, Escape closes, and focus is returned to the trigger — never lost to the page behind it."
              keys={["Esc", "Tab", "Shift+Tab"]}
            >
              <button
                type="button"
                className="a11y-btn a11y-btn--primary"
                onClick={() => setModalOpen(true)}
              >
                Open modal
              </button>

              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="A dialog that traps focus"
                description="Notice how Tab wraps inside this panel, Escape closes it, and keyboard focus lands back on the trigger."
              >
                <p className="a11y-modal__prose">
                  The panel carries <code className="chip">role="dialog"</code>{" "}
                  and <code className="chip">aria-modal</code>, the page scroll is
                  locked, and every openable element inside becomes part of the
                  focus loop.
                </p>
                <Checkbox
                  label="Remember my preference"
                  checked={remember}
                  onChange={() => setRemember((v) => !v)}
                  hint="Only stored in this demo."
                />
                <div className="a11y-modal__actions">
                  <button
                    type="button"
                    className="a11y-btn a11y-btn--ghost"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="a11y-btn a11y-btn--primary"
                    onClick={() => setModalOpen(false)}
                  >
                    Save &amp; close
                  </button>
                </div>
              </Modal>
            </Panel>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} distance={24}>
          <div className="a11y-form-card">
            <div className="a11y-form-card__intro">
              <p className="a11y-form-card__eyebrow">01 / Form inputs</p>
              <h3 className="a11y-form-card__title">
                A form that announces its own errors.
              </h3>
              <p className="a11y-form-card__description">
                Every field pairs a programmatic label with{" "}
                <code className="chip">aria-describedby</code>; invalid fields set{" "}
                <code className="chip">aria-invalid</code> and read the error out
                via a live region. Radios and checkboxes use their native
                keyboard behavior.
              </p>
              <div className="a11y-card__keys" aria-hidden="true">
                <kbd className="a11y-kbd">Tab</kbd>
                <kbd className="a11y-kbd">Shift+Tab</kbd>
                <kbd className="a11y-kbd">↑</kbd>
                <kbd className="a11y-kbd">↓</kbd>
                <kbd className="a11y-kbd">Space</kbd>
              </div>
            </div>

            <form
              className="a11y-form"
              noValidate
              onSubmit={handleSubmit}
              onReset={resetForm}
            >
              <div className="a11y-form__grid">
                <TextField
                  name="name"
                  label="Full name"
                  placeholder="Escript Jose"
                  required
                  hint="Used only for the demo confirmation."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  error={errors.name}
                />
                <TextField
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="joseescript@example.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={errors.email}
                />
              </div>

              <div className="a11y-form__grid">
                <Select
                  name="country"
                  label="Country"
                  options={[
                    { value: "us", label: "United States" },
                    { value: "ca", label: "Canada" },
                    { value: "uk", label: "United Kingdom" },
                    { value: "de", label: "Germany" },
                    { value: "jp", label: "Japan" },
                    { value: "ng", label: "Nigeria" },
                    { value: "other", label: "Somewhere else" },
                  ]}
                  placeholder="Pick one…"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  hint="A native select keeps its built-in keyboard behavior."
                />
                <RadioGroup
                  name="role"
                  label="What is your role?"
                  required
                  options={[
                    { value: "engineer", label: "Engineer", hint: "Ships the interfaces." },
                    { value: "designer", label: "Designer", hint: "Cares about the details." },
                    { value: "researcher", label: "Evaluator", hint: "Judges the outputs." },
                  ]}
                  value={role}
                  onChange={setRole}
                  hint="Arrow keys move between options."
                />
              </div>

              <div className="a11y-form__row">
                <Checkbox
                  label="Send me occasional product updates"
                  checked={newsletter}
                  onChange={() => setNewsletter((v) => !v)}
                />
              </div>

              <div className="a11y-form__actions">
                <div aria-live="polite">
                  {done && (
                    <p className="a11y-form__success">
                      Thanks {name.split(" ")[0] || "friend"} — your request went
                      through.
                    </p>
                  )}
                </div>
                <div className="a11y-form__buttons">
                  <button type="reset" className="a11y-btn a11y-btn--ghost">
                    Reset
                  </button>
                  <button type="submit" className="a11y-btn a11y-btn--primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}