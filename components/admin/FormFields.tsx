"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  id?: string;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement>, FieldProps {}
interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export function InputField({ label, error, className, id, ...props }: InputFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  
  return (
    <div className={cn("space-y-2", className)}>
      <label 
        htmlFor={inputId} 
        className="text-sm font-semibold text-text-primary tracking-wide uppercase"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full h-12 px-4 bg-background border border-border rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/40 focus:border-accent-blue transition-all duration-200",
          error && "border-rose-500 focus:ring-rose-500/20",
          props.disabled && "opacity-50 cursor-not-allowed grayscale"
        )}
        {...props}
      />
      {error && <p className="text-xs font-semibold text-rose-400 mt-1">{error}</p>}
    </div>
  );
}

export function TextAreaField({ label, error, className, id, ...props }: TextAreaFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  
  return (
    <div className={cn("space-y-2", className)}>
      <label 
        htmlFor={inputId} 
        className="text-sm font-semibold text-text-primary tracking-wide uppercase"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        rows={4}
        className={cn(
          "w-full p-4 bg-background border border-border rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/40 focus:border-accent-blue transition-all duration-200 resize-none",
          error && "border-rose-500 focus:ring-rose-500/20",
          props.disabled && "opacity-50 cursor-not-allowed grayscale"
        )}
        {...props}
      />
      {error && <p className="text-xs font-semibold text-rose-400 mt-1">{error}</p>}
    </div>
  );
}

export function ToggleSwitch({ 
  label, 
  checked, 
  onChange, 
  id, 
  className 
}: { 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex items-center justify-between p-4 bg-background border border-border rounded-xl group transition-all duration-300 hover:border-accent-blue/40", className)}>
      <label htmlFor={inputId} className="text-sm font-semibold text-text-primary cursor-pointer tracking-wide">
        {label}
      </label>
      <button
        type="button"
        id={inputId}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 focus:ring-offset-2 focus:ring-offset-background",
          checked ? "bg-accent-blue" : "bg-border/60"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow-lg shadow-black/20 transition-transform duration-300 pointer-events-none",
            checked ? "translate-x-5" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
