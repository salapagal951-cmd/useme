"use client";

import { useState } from "react";
import type {
  ChatMessage,
  AskBhiduResponse,
} from "@/lib/bhidu/chat";

import { BHIDU_LOADING_MESSAGES } from "@/lib/bhidu/loading";
import type { BhiduLanguage } from "@/lib/bhidu/types";

const loadingMessage =
  BHIDU_LOADING_MESSAGES[
    Math.floor(Math.random() * BHIDU_LOADING_MESSAGES.length)
  ];

export function useBhidu() {

  const [language, setLanguage] =
  useState<BhiduLanguage>("hinglish");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function askBhidu(message?: string) {
    const currentMessage = (message ?? userMessage).trim();

    if (!currentMessage || loading) return;

    const userChat: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: currentMessage,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userChat]);
    setUserMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/bhidu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  userMessage: currentMessage,
  language,
}),
      });

      const data: AskBhiduResponse = await res.json();

      const bhiduChat: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.success
          ? data.response ?? ""
          : data.error ?? "Something went wrong.",
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, bhiduChat]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Unable to reach Bhidu right now.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  return {
  language,
  setLanguage,
    messages,
    userMessage,
    setUserMessage,
    loading,
    askBhidu,
    clearChat,
  };
}