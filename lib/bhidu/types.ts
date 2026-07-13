// lib/bhidu/types.ts

export type BhiduLanguage = "english" | "hinglish" | "hindi";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface BuildBhiduSystemInstructionOptions {
  language?: BhiduLanguage;
  context?: string;

  includeTools?: boolean;
  includeExamples?: boolean;
}

export interface BuildBhiduUserPromptOptions {
  conversation?: string;
  userMessage: string;
}

export interface BhiduChatPrompt {
  systemInstruction: string;
  userPrompt: string;
}

export interface BhiduChatPrompt {
  systemInstruction: string;
  userPrompt: string;
}