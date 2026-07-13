"use client";

import type { BhiduLanguage } from "@/lib/bhidu/types";

type LanguageSelectorProps = {
  value: BhiduLanguage;
  onChange: (language: BhiduLanguage) => void;
};

const LANGUAGES: {
  value: BhiduLanguage;
  label: string;
}[] = [
  { value: "english", label: "English" },
  { value: "hinglish", label: "Hinglish" },
  { value: "hindi", label: "हिन्दी" },
];

export default function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.value}
          onClick={() => onChange(lang.value)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            value === lang.value
              ? "bg-blue-600 text-white shadow-md"
              : "border border-zinc-200 bg-white text-zinc-700 hover:bg-blue-50"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}