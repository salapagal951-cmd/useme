import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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
          text: `
You are an expert competitive exam paper setter.

Analyze the study material in this image.

Generate ONLY valid JSON.

[
  {
    "question":"...",
    "options":["...","...","...","..."],
    "answer":"..."
  }
]

Rules:
- Generate as many meaningful questions as possible.
- Do NOT invent information.
- Every question must have exactly 4 UNIQUE options.
- Never repeat an option.
- The correct answer must appear exactly once.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.
`,
        },
      ],
    });

    let text = response.text ?? "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    return Response.json({
      success: true,
      result: parsed,
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