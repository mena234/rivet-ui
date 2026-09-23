"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FieldFrameProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}

function FieldFrame({ label, description, error, required, htmlFor, children }: FieldFrameProps) {
  return (
    <label className="rv-form-field" htmlFor={htmlFor} data-invalid={Boolean(error) || undefined}>
      <span className="rv-form-field__label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {children}
      {error ? <span className="rv-form-field__error">{error}</span> : description ? <span className="rv-form-field__hint">{description}</span> : null}
    </label>
  );
}

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  description?: string;
  error?: string;
  leadingIcon?: ReactNode;
}

export function TextField({ id, label, description, error, leadingIcon, className, required, ...props }: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;
  return (
    <FieldFrame label={label} description={description} error={error} required={required} htmlFor={fieldId}>
      <span className={cn("rv-control-shell", className)}>
        {leadingIcon ? <span className="rv-control-shell__icon">{leadingIcon}</span> : null}
        <input id={fieldId} required={required} aria-invalid={Boolean(error) || undefined} aria-describedby={description || error ? messageId : undefined} {...props} />
      </span>
      {(description || error) ? <span id={messageId} className="rv-sr-only">{error ?? description}</span> : null}
    </FieldFrame>
  );
}

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  error?: string;
}

export function TextAreaField({ id, label, description, error, className, required, ...props }: TextAreaFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;
  return (
    <FieldFrame label={label} description={description} error={error} required={required} htmlFor={fieldId}>
      <textarea className={cn("rv-textarea", className)} id={fieldId} required={required} aria-invalid={Boolean(error) || undefined} aria-describedby={description || error ? messageId : undefined} {...props} />
      {(description || error) ? <span id={messageId} className="rv-sr-only">{error ?? description}</span> : null}
    </FieldFrame>
  );
}

export interface SelectOption { value: string; label: string; disabled?: boolean }

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  description?: string;
  error?: string;
  options: SelectOption[];
}

export function SelectField({ id, label, description, error, options, className, required, ...props }: SelectFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;
  return (
    <FieldFrame label={label} description={description} error={error} required={required} htmlFor={fieldId}>
      <select className={cn("rv-select", className)} id={fieldId} required={required} aria-invalid={Boolean(error) || undefined} aria-describedby={description || error ? messageId : undefined} {...props}>
        {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
      </select>
      {(description || error) ? <span id={messageId} className="rv-sr-only">{error ?? description}</span> : null}
    </FieldFrame>
  );
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export function Checkbox({ id, label, description, className, ...props }: CheckboxProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <label className={cn("rv-choice", className)} htmlFor={fieldId}>
      <input id={fieldId} type="checkbox" {...props} />
      <span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span>
    </label>
  );
}

export interface RadioOption { value: string; label: string; description?: string; disabled?: boolean }

export interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

export function RadioGroup({ label, name, options, value, defaultValue, onValueChange, orientation = "vertical" }: RadioGroupProps) {
  return (
    <fieldset className="rv-radio-group" data-orientation={orientation}>
      <legend>{label}</legend>
      <div className="rv-radio-group__options">
        {options.map((option) => (
          <label className="rv-choice" key={option.value}>
            <input type="radio" name={name} value={option.value} checked={value !== undefined ? value === option.value : undefined} defaultChecked={value === undefined ? defaultValue === option.value : undefined} disabled={option.disabled} onChange={() => onValueChange?.(option.value)} />
            <span><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export interface SwitchProps {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({ label, description, checked, defaultChecked = false, disabled, onCheckedChange }: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;
  const toggle = () => {
    const next = !isChecked;
    if (checked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  };
  return (
    <label className="rv-switch-row" data-disabled={disabled || undefined}>
      <span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span>
      <button className="rv-switch" type="button" role="switch" aria-checked={isChecked} disabled={disabled} onClick={toggle}><span /></button>
    </label>
  );
}
