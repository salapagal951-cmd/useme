"use client";

import { useState } from "react";
import { Brain, Loader2, Sparkles } from "lucide-react";

export default function BhiduSection() {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askBhidu() {
    if (!userMessage.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/bhidu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.response);
      } else {
        setResponse(data.error || "Something went wrong.");
      }
    } catch {
      setResponse("Unable to reach Bhidu right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Brain className="text-blue-600" size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-zinc-900">
            Meet Bhidu 😎
          </h2>

          <p className="mt-1 text-zinc-600">
            Your AI Study Partner
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-lg text-zinc-700">
        Ask doubts, understand concepts, make study plans or get exam
        guidance. Bhidu is here to help you study smarter.
      </p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask Bhidu anything..."
          className="flex-1 rounded-2xl border border-zinc-300 px-5 py-4 text-lg outline-none focus:border-blue-500"
        />

        <button
          onClick={askBhidu}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Ask Bhidu
            </>
          )}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        {[
          "Explain Percentage",
          "Make me a study plan",
          "Quiz me on Indian Polity",
          "I have a PDF",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setUserMessage(item)}
            className="rounded-full bg-zinc-100 px-4 py-2 transition hover:bg-zinc-200"
          >
            {item}
          </button>
        ))}
      </div>

      {response && (
        <div className="mt-8 rounded-2xl bg-zinc-50 p-6">
          <h3 className="mb-3 font-semibold text-zinc-900">
            Bhidu
          </h3>

          <p className="whitespace-pre-wrap leading-8 text-zinc-700">
            {response}
          </p>
        </div>
      )}
    </section>
  );
}