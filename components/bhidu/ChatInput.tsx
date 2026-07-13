"use client";

import { Loader2, Sparkles } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading?: boolean;
  placeholder?: string;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading = false,
  placeholder = "Ask Bhidu anything...",
}: ChatInputProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-3 shadow-lg md:flex-row">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend();
          }
        }}
        placeholder={placeholder}
        className="flex-1 rounded-2xl bg-transparent px-5 py-4 text-lg text-zinc-900 placeholder:text-zinc-400 outline-none"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Thinking...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Start Studying
          </>
        )}
      </button>
    </div>
  );
}