type SelectProps = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

export default function Select({
  value,
  onChange,
  children,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      {children}
    </select>
  );
}