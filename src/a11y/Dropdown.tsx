import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
}

export interface DropdownProps<T extends string> {
  label: string;
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Accessible menu-button dropdown.
 *
 * - Trigger: `aria-haspopup="menu"` + `aria-expanded`
 * - Menu items use `role="menuitemradio"` + `aria-checked` to expose the selection
 * - Roving tabindex: only the highlighted item is in the tab order
 * - ArrowUp/Down move, Home/End jump, Enter/Space select, Escape closes and
 *   returns focus to the trigger, Tab closes, pointer outside closes
 */
export default function Dropdown<T extends string>({
  label,
  options,
  value,
  onChange,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();

  useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open]);

  const choose = (index: number) => {
    onChange(options[index].value);
    setActiveIndex(index);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (open) return;
    if (["ArrowDown", "ArrowUp", "Enter", " ", "Spacebar"].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    }
  };

  const handleItemKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        const delta = event.key === "ArrowDown" ? 1 : -1;
        const next = (index + delta + options.length) % options.length;
        setActiveIndex(next);
        break;
      }
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ": {
        event.preventDefault();
        choose(index);
        break;
      }
      case "Escape":
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  return (
    <div className="a11y-dropdown" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="a11y-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          if (open) {
            setOpen(false);
            triggerRef.current?.focus();
          } else {
            setOpen(true);
            setActiveIndex(
              Math.max(0, options.findIndex((o) => o.value === value)),
            );
          }
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="a11y-dropdown__label">{selectedLabel}</span>
        <svg
          className={`a11y-dropdown__chevron${open ? " a11y-dropdown__chevron--open" : ""}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="a11y-dropdown__menu"
          id={menuId}
          role="menu"
          aria-label={label}
        >
          {options.map((option, index) => {
            const checked = option.value === value;
            return (
              <button
                key={option.value}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={checked}
                tabIndex={activeIndex === index ? 0 : -1}
                className={`a11y-dropdown__item${activeIndex === index ? " a11y-dropdown__item--active" : ""}`}
                onClick={() => choose(index)}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="a11y-dropdown__check" aria-hidden="true">
                  {checked && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5 9.5 17 19 7" />
                    </svg>
                  )}
                </span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}