import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const Label = ({ children, required, className, ...props }: LabelProps) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-1 ${
        className || ""
      }`}
      {...props}
    >
      {children}
      {required && <span className="text-[var(--red)] ml-1">*</span>}
    </label>
  );
};

export default Label;
