import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  label: string;
  tabs: TabDef[];
  defaultIndex?: number;
  orientation?: "horizontal" | "vertical";
}

/**
 * Accessible tabs.
 *
 * - `role="tablist"` / `role="tab"` / `role="tabpanel"` wiring with
 *   `aria-selected`, `aria-controls` and `aria-labelledby`
 * - Roving tabindex: only the selected tab is in the tab order
 * - Arrow keys move (left/right for horizontal, up/down for vertical) with
 *   automatic activation, Home/End jump to the first / last tab
 * - The active panel is focusable (`tabIndex={0}`) so its content can be scrolled
 */
export default function Tabs({
  label,
  tabs,
  defaultIndex = 0,
  orientation = "horizontal",
}: TabsProps) {
  const safeDefault = Math.min(Math.max(defaultIndex, 0), tabs.length - 1);
  const [activeIndex, setActiveIndex] = useState(safeDefault);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      move((activeIndex + 1) % tabs.length);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      move((activeIndex - 1 + tabs.length) % tabs.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(tabs.length - 1);
    }
  };

  const move = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  return (
    <div className={`a11y-tabs a11y-tabs--${orientation}`}>
      <div
        className="a11y-tabs__list"
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
      >
        {tabs.map((tab, index) => {
          const selected = activeIndex === index;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`a11y-tabs__tab${selected ? " a11y-tabs__tab--active" : ""}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={`${baseId}-panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
        tabIndex={0}
        className="a11y-tabs__panel"
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}