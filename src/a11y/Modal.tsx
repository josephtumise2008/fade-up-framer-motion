import { useEffect, useId, type PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFocusTrap, useScrollLock } from "./useFocusTrap";

export interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

/**
 * Accessible modal dialog.
 *
 * - `role="dialog"` + `aria-modal="true"`, labelled via a generated heading id
 * - Focus is trapped inside and returns to the triggering element on close
 * - `Escape` closes, click on the backdrop closes, body scroll is locked
 * - Tab order wraps from last to first control and back
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useFocusTrap<HTMLDivElement>(open);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, panelRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="a11y-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            className="a11y-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="a11y-modal__header">
              <h3 className="a11y-modal__title" id={titleId}>
                {title}
              </h3>
              <button
                type="button"
                className="a11y-modal__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            {description && (
              <p className="a11y-modal__description" id={descriptionId}>
                {description}
              </p>
            )}
            <div className="a11y-modal__body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}