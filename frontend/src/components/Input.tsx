import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

// forwardRef permite que o componente pai (Login) mexa no input filho
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input ref={ref} className="form-input" {...props} />
    </div>
  );
});