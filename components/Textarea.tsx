type TextareaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export default function Textarea({
  value,
  onChange,
  placeholder,
}: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-2 h-64 w-full rounded-xl border bg-white p-4 text-black"
    />
  );
}