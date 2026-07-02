type BadgeProps = {
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "gray";
};

export default function Badge({
  children,
  color = "blue",
}: BadgeProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
    gray: "bg-zinc-100 text-zinc-700 border-zinc-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}