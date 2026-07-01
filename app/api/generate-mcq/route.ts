import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

export async function POST(request: Request) {
  try {
    const {
      studyMode,
      topic,
      notes,
      difficulty,
      questionCount,
    } = await request.json();

    // Validation
    if (studyMode === "topic" && !topic?.trim()) {
      return Response.json(
        {
          success: false,
          message: "Please enter a topic.",
        },
        { status: 400 }
      );
    }

    if (studyMode === "notes" && !notes?.trim()) {
      return Response.json(
        {
          success: false,
          message: "Please paste your notes.",
        },
        { status: 400 }
      );
    }

    const prompt =
      studyMode === "topic"
        ? `
You are an expert competitive exam paper setter.

Generate EXACTLY ${questionCount} ${difficulty} multiple choice questions on:

"${topic}"

Return ONLY valid JSON.

If the topic is meaningless, fictional, misspelled beyond recognition, or you do not have reliable knowledge about it, return ONLY:

{
  "error": "UNKNOWN_TOPIC"
}

Otherwise return:

[
  {
    "question":"...",
    "options":["...","...","...","..."],
    "answer":"..."
  }
]

Rules:
- Do NOT invent facts.
- Do NOT write introductions.
- Do NOT write explanations.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.
- Each question must have exactly 4 options.
- Answer must exactly match one option.
- Mix factual and conceptual questions.
`
        : `
You are an expert competitive exam paper setter.

Generate EXACTLY ${questionCount} ${difficulty} multiple choice questions from these notes:

${notes}

Return ONLY valid JSON.

[
  {
    "question":"...",
    "options":["...","...","...","..."],
    "answer":"..."
  }
]

Rules:
- Do NOT invent facts.
- Do NOT write introductions.
- Do NOT write explanations.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.
- Each question must have exactly 4 options.
- Answer must exactly match one option.
- Mix factual and conceptual questions.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text ?? "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    if (
      !Array.isArray(parsed) &&
      parsed?.error === "UNKNOWN_TOPIC"
    ) {
      return Response.json({
        success: false,
        message:
          "Topic not recognized. Please check the spelling or try another topic.",
      });
    }

    return Response.json({
      success: true,
      result: parsed,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          "Failed to generate MCQs. The AI may have returned an invalid response.",
      },
      {
        status: 500,
      }
    );
  }
}