"use client";

import type { ChatMessage } from "@/lib/bhidu/chat";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

type ConversationProps = {
  messages: ChatMessage[];
  userMessage: string;
  loading: boolean;
  setUserMessage: (value: string) => void;
  askBhidu: () => void;
};

export default function Conversation({
  messages,
  userMessage,
  loading,
  setUserMessage,
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