import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger";
}

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}