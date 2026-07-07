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

   const topicPrompt = `
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
`;

const notesPrompt =
  questionCount === "max"
    ? `
You are an expert competitive exam paper setter.

Generate the MAXIMUM number of unique, meaningful ${difficulty} multiple choice questions possible from these notes.

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
- Generate every meaningful question possible.
- Do NOT invent information.
- Stop when there are no more concepts to test.
- Do NOT repeat questions.
- Each question must have exactly 4 options.
- Answer must exactly match one option.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.
`
    : `
You are an expert competitive exam paper setter.

Generate UP TO ${questionCount} ${difficulty} multiple choice questions from these notes.

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
- Generate as many meaningful questions as possible, up to ${questionCount}.
- If the notes don't contain enough information, generate fewer questions instead of inventing content.
- Do NOT invent facts.
- Do NOT repeat questions.
- Each question must have exactly 4 UNIQUE options.
- Never repeat an option.
- The correct answer must appear exactly once.
- The answer must exactly match one of the four options.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.
`;

const prompt =
  studyMode === "topic"
    ? topicPrompt
    : notesPrompt;

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
  studyMode === "notes"
    ? "Your notes didn't contain enough information to generate questions. Try adding more detailed notes."
    : "Topic not recognized. Please check the spelling or try another topic.",
      });
    }

   const validated = parsed.filter((mcq: MCQ) => {
  if (
    !mcq.question ||
    !Array.isArray(mcq.options) ||
    mcq.options.length !== 4
  ) {
    return false;
  }

  const uniqueOptions = new Set(mcq.options);

  if (uniqueOptions.size !== 4) {
    return false;
  }

  if (!mcq.options.includes(mcq.answer)) {
    return false;
  }

  return true;
});

return Response.json({
  success: true,
  result: validated,
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