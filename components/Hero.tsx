"use client";

import { useBhidu } from "@/hooks/useBhidu";

import HeroLanding from "./bhidu/HeroLanding";
import Conversation from "./bhidu/Conversation";

export default function Hero() {
  const {
    messages,
    language,
    setLanguage,
    userMessage,
    setUserMessage,
    loading,
    askBhidu,
  } = useBhidu();

  if (messages.length === 0) {
    return (
      <HeroLanding
        language={language}
        setLanguage={setLanguage}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        askBhidu={() => askBhidu()}
        loading={loading}
      />
    );
  }

  return (
    <Conversation
      messages={messages}
      language={language}
      setLanguage={setLanguage}
      userMessage={userMessage}
      setUserMessage={setUserMessage}
      loading={loading}
      askBhidu={() => askBhidu()}
    />
  );
}