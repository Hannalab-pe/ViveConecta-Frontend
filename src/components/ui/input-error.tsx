import type { FieldError } from "react-hook-form";

interface InputErrorProps {
  error?: FieldError | string;
  className?: string;
}

const InputError = ({ error, className }: InputErrorProps) => {
  if (!error) return null;

  const errorMessage = typeof error === "string" ? error : error.message;

  if (!errorMessage) return null;

  return (
    <p className={`text-sm text-[var(--red)] mt-1 ${className || ""}`}>
      {errorMessage}
    </p>
  );
};

export default InputError;
