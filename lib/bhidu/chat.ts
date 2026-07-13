export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface AskBhiduRequest {
  userMessage: string;
}

export interface AskBhiduResponse {
  success: boolean;
  response?: string;
  error?: string;
}