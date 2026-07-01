type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const defaultClasses =
    "rounded-xl px-6 py-3 font-semibold text-white transition disabled:opacity-50";

  const colorClasses = className.includes("bg-")
    ? ""
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultClasses} ${colorClasses} ${className}`}
    >
      {children}
    </button>
  );
}