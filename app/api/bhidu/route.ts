import { NextRequest, NextResponse } from "next/server";
import { ai, GEMINI_MODEL } from "@/lib/gemini/client";
import { buildChatPrompt } from "@/lib/bhidu/prompts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
  userMessage,
  language = "english",
  conversation,
  context,
} = body;

    if (!userMessage?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    console.log("Language received:", language);

    const prompt = buildChatPrompt({
      language,
      conversation,
      context,
      userMessage,
    });

    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt.userPrompt,
      config: {
        systemInstruction: prompt.systemInstruction,
      },
    });

    const text = result.text?.trim();

if (!text) {
  throw new Error("Empty response from Gemini.");
}

return NextResponse.json({
  success: true,
  response: text,
});

  } catch (error: any) {
  console.error("Bhidu Error:", error);

  let message =
    "😅 Oops... Bhidu had a tiny hiccup.\n\nTry asking it a little differently, or give Bhidu another shot in a few seconds. 😎";

  if (error?.status === 503) {
    message =
      "🚦 Bhidu is getting a lot of students right now!\n\nGive me 10–20 seconds and ask again. I'll be ready. 😎";
  }

  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 200 }
  );
}
}