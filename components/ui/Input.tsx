type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function Input({
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}