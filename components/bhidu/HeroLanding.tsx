"use client";

import ChatInput from "./ChatInput";
import SuggestionChips from "./SuggestionChips";
import type { BhiduLanguage } from "@/lib/bhidu/types";
import LanguageSelector from "./LanguageSelector";

type HeroLandingProps = {
  language: BhiduLanguage;
  setLanguage: (language: BhiduLanguage) => void;

  userMessage: string;
  setUserMessage: (value: string) => void;

  askBhidu: () => void;
  loading: boolean;
};

export default function HeroLanding({
  language,
  setLanguage,
  userMessage,
  setUserMessage,
  askBhidu,
  loading,
}: HeroLandingProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="text-lg font-semibold text-blue-600">
        StudyDif
      </p>

      <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-900 md:text-7xl">
        Meet Bhidu 😎
      </h1>

      <p className="mt-6 text-xl font-semibold text-zinc-700">
        Your AI Study Partner
      </p>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
        Explain concepts, create quizzes, revise smarter,
        build study plans and prepare confidently for your exams.
      </p>

      <div className="mt-8">
  <p className="mb-3 text-sm font-semibold text-zinc-600">
    🌍 Language
  </p>

  <LanguageSelector
    value={language}
    onChange={setLanguage}
  />
</div>

      <div className="mx-auto mt-10 max-w-3xl">
        <ChatInput
          value={userMessage}
          onChange={setUserMessage}
          onSend={askBhidu}
          loading={loading}
        />
      </div>

      <div className="mt-8">
        <SuggestionChips
          onSelect={(prompt) => setUserMessage(prompt)}
        />
      </div>
    </section>
  );
}