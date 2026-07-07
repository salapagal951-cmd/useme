"use client";

import Link from "next/link";

import GeneratorHeader from "@/components/GeneratorHeader";
import FileUploadCard from "@/components/FileUploadCard";
import { useState } from "react";
import Button from "@/components/Button";
import ResultsSection from "@/components/ResultsSection";
import { jsPDF } from "jspdf";
import { downloadQuizPDF } from "@/lib/pdf-generator";


export default function FileQuizPage() {

  const [difficulty, setDifficulty] = useState("Medium");
const [questionCount, setQuestionCount] = useState(10);

const [loading, setLoading] = useState(false);

const [mcqs, setMcqs] = useState([]);

    const [file, setFile] = useState<File | null>(null);

   function downloadPDF() {
  const fileName = `${
    (file?.name ?? "Practice-Questions")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-")
  }-${new Date().toISOString().split("T")[0]}.pdf`;

  downloadQuizPDF({
    mcqs,
    title: file?.name ?? "Uploaded File",
    difficulty,
    questionCount,
    fileName,
  });
}

  return (
    <main className="min-h-screen bg-zinc-50 px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white p-4 shadow-sm sm:p-8">
        <Link
          href="/"
          className="mb-5 inline-block rounded-lg bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
        >
          ← Back to Home
        </Link>

        <GeneratorHeader loading={false} />

        <FileUploadCard
  onFileSelect={(selectedFile) => {
    setFile(selectedFile);
    console.log(selectedFile);
  }}
/>

{file && (
  <p className="mt-4 text-center text-sm text-zinc-600">
    Selected File: <span className="font-semibold">{file.name}</span>
  </p>
)}

<Button
  className="mt-6 w-full"
  disabled={!file || loading}
  onClick={async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const endpoint =
  file.type === "application/pdf"
    ? "/api/extract-pdf"
    : "/api/generate-image-mcq";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        setLoading(false);
        alert(data.message);
        return;
      }

      if (file.type.startsWith("image/")) {
  setLoading(false);
  setMcqs(data.result);
  return;
}

const extractedText =
  typeof data.text === "string"
    ? data.text
    : JSON.stringify(data.text);

const mcqResponse = await fetch("/api/generate-mcq", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    studyMode: "notes",
    notes: extractedText,
    difficulty,
    questionCount,
  }),
});

const mcqData = await mcqResponse.json();

setLoading(false);

if (!mcqData.success) {
  alert(mcqData.message);
  return;
}

setMcqs(mcqData.result);

      setMcqs(mcqData.result);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong.");
    }
  }}
>
  {loading ? "Generating..." : "✨ Generate Quiz"}
</Button>

<ResultsSection
  mcqs={mcqs}
  studyMode="notes"
  topic={file?.name ?? "Uploaded File"}
  difficulty={difficulty}
  questionCount={questionCount}
  downloadPDF={downloadPDF}
/>


      </div>
    </main>
  );
}