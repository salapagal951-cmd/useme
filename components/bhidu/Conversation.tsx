"use client";

import type { ChatMessage } from "@/lib/bhidu/chat";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import LanguageSelector from "./LanguageSelector";
import type { BhiduLanguage } from "@/lib/bhidu/types";

type ConversationProps = {
  messages: ChatMessage[];

  language: BhiduLanguage;
  setLanguage: (language: BhiduLanguage) => void;

  userMessage: string;
  setUserMessage: (value: string) => void;

  loading: boolean;
  askBhidu: () => void;
};

export default function Conversation({
  messages,
  language,
  setLanguage,
  userMessage,
  setUserMessage,
  loading,
  askBhidu,
}: ConversationProps) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          StudyDif
        </p>

        <h1 className="mt-2 text-4xl font-black text-zinc-900">
          😎 Bhidu
        </h1>

        <div className="mt-5">
  <p className="mb-3 text-sm font-semibold text-zinc-600">
    🌍 Language
  </p>

  <LanguageSelector
    value={language}
    onChange={setLanguage}
  />
</div>

        <p className="mt-2 text-zinc-600">
          Your AI Study Partner
        </p>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-5">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-500 shadow-sm">
            Bhidu is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-8">
        <ChatInput
          value={userMessage}
          onChange={setUserMessage}
          onSend={askBhidu}
          loading={loading}
          placeholder="Ask Bhidu a follow-up..."
        />
      </div>
    </section>
  );
}