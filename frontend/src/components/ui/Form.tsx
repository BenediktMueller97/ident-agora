"use client";

import { FormHTMLAttributes, ReactNode, createContext, useContext } from "react";

// Form context for sharing form state
interface FormContextValue {
  isSubmitting: boolean;
}

const FormContext = createContext<FormContextValue>({ isSubmitting: false });

export function useFormContext() {
  return useContext(FormContext);
}

// Form component
interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  isSubmitting?: boolean;
}

function Form({ children, isSubmitting = false, className = "", ...props }: FormProps) {
  return (
    <FormContext.Provider value={{ isSubmitting }}>
      <form className={`space-y-4 ${className}`} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Form field wrapper
interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

function FormField({ children, className = "" }: FormFieldProps) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

// Form label
interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

function FormLabel({ htmlFor, required, children, className = "" }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

// Form error message
interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

function FormError({ children, className = "" }: FormErrorProps) {
  if (!children) return null;

  return (
    <p className={`text-sm text-red-600 ${className}`} role="alert">
      {children}
    </p>
  );
}

// Form helper text
interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
}

function FormHelperText({ children, className = "" }: FormHelperTextProps) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

// Form actions (button container)
interface FormActionsProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

function FormActions({ children, className = "", align = "right" }: FormActionsProps) {
  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex items-center gap-3 pt-4 ${alignStyles[align]} ${className}`}>
      {children}
    </div>
  );
}

export { Form, FormField, FormLabel, FormError, FormHelperText, FormActions };
export type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormErrorProps,
  FormHelperTextProps,
  FormActionsProps,
};
