"use client";

import type { ChatMessage } from "@/lib/bhidu/chat";
import { Brain, User } from "lucide-react";

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[90%] rounded-3xl p-5 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-zinc-200 bg-white text-zinc-800"
        }`}
      >
        <div className="mb-3 flex items-center gap-2">
          {isUser ? (
            <User size={18} />
          ) : (
            <Brain
              size={18}
              className="text-blue-600"
            />
          )}

          <span className="text-sm font-semibold">
            {isUser ? "You" : "Bhidu"}
          </span>
        </div>

        <p className="whitespace-pre-wrap leading-8">
          {message.content}
        </p>
      </div>
    </div>
  );
}