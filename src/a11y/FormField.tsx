import {
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

interface FieldSharedProps {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

function FieldMessages({
  hint,
  error,
  hintId,
  errorId,
}: {
  hint?: string;
  error?: string;
  hintId: string;
  errorId: string;
}) {
  if (!hint && !error) return null;
  return (
    <div className="a11y-field__messages">
      {hint && (
        <p id={hintId} className="a11y-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="a11y-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function RequiredMark({ required }: { required?: boolean }) {
  if (!required) return null;
  return (
    <span className="a11y-field__required" aria-hidden="true">
      *
    </span>
  );
}

function describedBy(error?: string, hint?: string, errorId = "", hintId = "") {
  return [error ? errorId : "", hint && !error ? hintId : ""]
    .filter(Boolean)
    .join(" ") || undefined;
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">,
    FieldSharedProps {
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
}

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  type = "text",
  ...inputProps
}: TextFieldProps) {
  const uid = useId();
  const fieldId = id ?? `${uid}-input`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedByAttrs = describedBy(error, hint, errorId, hintId);

  return (
    <div
      className={`a11y-field a11y-field--input${error ? " a11y-field--error" : ""}${className ? ` ${className}` : ""}`}
    >
      <label htmlFor={fieldId} className="a11y-field__label">
        {label}
        <RequiredMark required={required} />
      </label>
      <input
        {...inputProps}
        id={fieldId}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByAttrs}
        className="a11y-input"
      />
      <FieldMessages
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">,
    FieldSharedProps {}

export function TextArea({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  rows = 3,
  ...textareaProps
}: TextAreaProps) {
  const uid = useId();
  const fieldId = id ?? `${uid}-textarea`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedByAttrs = describedBy(error, hint, errorId, hintId);

  return (
    <div
      className={`a11y-field a11y-field--input${error ? " a11y-field--error" : ""}${className ? ` ${className}` : ""}`}
    >
      <label htmlFor={fieldId} className="a11y-field__label">
        {label}
        <RequiredMark required={required} />
      </label>
      <textarea
        {...textareaProps}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByAttrs}
        className="a11y-input"
      />
      <FieldMessages
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">,
    FieldSharedProps {
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  options,
  placeholder,
  ...selectProps
}: SelectProps) {
  const uid = useId();
  const fieldId = id ?? `${uid}-select`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedByAttrs = describedBy(error, hint, errorId, hintId);

  return (
    <div
      className={`a11y-field a11y-field--input${error ? " a11y-field--error" : ""}${className ? ` ${className}` : ""}`}
    >
      <label htmlFor={fieldId} className="a11y-field__label">
        {label}
        <RequiredMark required={required} />
      </label>
      <select
        {...selectProps}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByAttrs}
        className="a11y-input a11y-select"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessages
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

export interface RadioGroupProps extends FieldSharedProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  name,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  const uid = useId();
  const groupId = id ?? `${uid}-group`;
  const labelId = `${groupId}-label`;
  const hintId = `${groupId}-hint`;
  const errorId = `${groupId}-error`;
  const describedByAttrs = describedBy(error, hint, errorId, hintId);

  return (
    <div
      className={`a11y-field a11y-field--group${error ? " a11y-field--error" : ""}${className ? ` ${className}` : ""}`}
    >
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={describedByAttrs}
      >
        <span id={labelId} className="a11y-field__label">
          {label}
          <RequiredMark required={required} />
        </span>
        <div className="a11y-radio-list">
          {options.map((option) => (
            <label key={option.value} className="a11y-radio">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="a11y-radio__input"
              />
              <span className="a11y-radio__text">
                {option.label}
                {option.hint && (
                  <small className="a11y-radio__hint">{option.hint}</small>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>
      <FieldMessages
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">,
    FieldSharedProps {}

export function Checkbox({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  checked,
  onChange,
  ...inputProps
}: CheckboxProps) {
  const uid = useId();
  const fieldId = id ?? `${uid}-checkbox`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedByAttrs = describedBy(error, hint, errorId, hintId);

  return (
    <div
      className={`a11y-field a11y-field--boolean${error ? " a11y-field--error" : ""}${className ? ` ${className}` : ""}`}
    >
      <label className="a11y-checkbox" htmlFor={fieldId}>
        <input
          {...inputProps}
          id={fieldId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByAttrs}
          className="a11y-checkbox__input"
        />
        <span className="a11y-checkbox__box" aria-hidden="true" />
        <span className="a11y-checkbox__text">
          {label}
          <RequiredMark required={required} />
        </span>
      </label>
      <FieldMessages
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export interface SwitchProps {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}: SwitchProps) {
  const uid = useId();
  const controlId = id ?? `${uid}-switch`;
  const labelId = `${controlId}-label`;

  return (
    <div
      className={`a11y-field a11y-field--boolean${className ? ` ${className}` : ""}`}
    >
      <div className="a11y-switch__row">
        <span id={labelId} className="a11y-field__label">
          {label}
        </span>
        <span className="a11y-switch__group">
          <span className="a11y-switch__state" aria-hidden="true">
            {checked ? "On" : "Off"}
          </span>
          <button
            type="button"
            id={controlId}
            role="switch"
            aria-checked={checked}
            aria-labelledby={labelId}
            className={`a11y-switch${checked ? " a11y-switch--on" : ""}`}
            onClick={() => onChange(!checked)}
            disabled={disabled}
          >
            <span className="a11y-switch__thumb" aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>
  );
}