import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No PDF uploaded.",
        },
        { status: 400 }
      );
    }

    const buffer = new Uint8Array(await file.arrayBuffer());

    const pdf = await getDocumentProxy(buffer);

    const { text } = await extractText(pdf);

    return NextResponse.json({
      success: true,
      text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to extract PDF text.",
      },
      { status: 500 }
    );
  }
}