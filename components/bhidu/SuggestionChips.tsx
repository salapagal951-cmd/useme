"use client";

const SUGGESTIONS = [
  "Explain Percentage",
  "Make me a study plan",
  "Quiz me on Indian Polity",
  "I have a PDF",
];

type SuggestionChipsProps = {
  onSelect: (prompt: string) => void;
};

export default function SuggestionChips({
  onSelect,
}: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {SUGGESTIONS.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}