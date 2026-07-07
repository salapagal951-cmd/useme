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
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          message: "No image uploaded.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const base64 = Buffer.from(bytes).toString("base64");

    const prompt = `
You are an expert competitive exam paper setter.

Analyze the uploaded study material image and generate HIGH QUALITY multiple choice questions.

Return ONLY valid JSON.

[
  {
    "question":"...",
    "options":["...","...","...","..."],
    "answer":"..."
  }
]

Rules:
- Generate as many meaningful questions as possible.
- Do NOT invent information that isn't visible.
- Every question must have exactly 4 UNIQUE options.
- Never repeat an option.
- The correct answer must appear exactly once.
- The answer must exactly match one option.
- Do NOT include explanations.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64,
          },
        },
        {
          text: prompt,
        },
      ],
    });

    let text = response.text ?? "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed: MCQ[] = JSON.parse(text);

    const validated = parsed.filter((mcq) => {
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
        message: "Failed to generate quiz from image.",
      },
      {
        status: 500,
      }
    );
  }
}