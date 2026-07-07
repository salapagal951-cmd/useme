type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "success";
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const baseClasses =
    "rounded-xl px-6 py-3 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-zinc-900 text-white hover:bg-zinc-800",

    outline:
      "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100",

    success:
      "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}