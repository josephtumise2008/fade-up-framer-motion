import { useId, useState, type ReactNode } from "react";

export interface AccordionItemDef {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  allowMultiple?: boolean;
}

/**
 * Accessible accordion (disclosure pattern).
 *
 * - Header is a real `<button>` labelled with the item title, joined to the
 *   panel via `aria-controls` / `aria-labelledby`
 * - `aria-expanded` reflects open state; collapsed panels are hidden with the
 *   `hidden` semantics via `aria-hidden` + `inert` so their content is
 *   unreachable by keyboard and screen readers
 * - Operates with Enter / Space; navigation follows normal document tab order
 */
export default function Accordion({
  items,
  allowMultiple = false,
}: AccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set(items[0] ? [0] : []),
  );

  const toggle = (index: number) => {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) {
        if (allowMultiple || next.size > 1) next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="a11y-accordion">
      {items.map((item, index) => {
        const open = openItems.has(index);
        const headingId = `${baseId}-heading-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div
            className={`a11y-accordion__item${open ? " a11y-accordion__item--open" : ""}`}
            key={item.id}
          >
            <h3 className="a11y-accordion__heading">
              <button
                id={headingId}
                type="button"
                className="a11y-accordion__trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.title}</span>
                <svg
                  className="a11y-accordion__chevron"
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
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={`a11y-accordion__panel${open ? " a11y-accordion__panel--open" : ""}`}
              aria-hidden={!open}
              inert={!open}
            >
              <div className="a11y-accordion__content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}