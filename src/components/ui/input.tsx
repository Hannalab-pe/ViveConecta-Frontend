import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, type = "text", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={`
            w-full px-3 py-2.5 border rounded-lg text-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              error
                ? "border-[var(--red)] focus:ring-[var(--red)]"
                : "border-gray-300 hover:border-[var(--primary)]"
            }
            ${icon ? "pr-10" : ""}
            ${className || ""}
          `}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div
              className={`${
                error
                  ? "text-[var(--red)]"
                  : "text-gray-400 hover:text-[var(--primary)]"
              }`}
            >
              {icon}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
