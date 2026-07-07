"use client";

import { useState } from "react";

import Button from "@/components/Button";
import MCQCard from "@/components/MCQCard";
import QuizPlayer from "@/components/QuizPlayer/QuizPlayer";

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type Props = {
  mcqs: MCQ[];
  studyMode: "topic" | "notes";
  topic: string;
  difficulty: string;
 questionCount: number | "max";
  downloadPDF: () => void;
};

export default function ResultsSection({
  mcqs,
  studyMode,
  topic,
  difficulty,
  questionCount,
  downloadPDF,
}: Props) {
  const [quizStarted, setQuizStarted] = useState(false);

  if (mcqs.length === 0) return null;
if (quizStarted) {
  return (
    <QuizPlayer
  mcqs={mcqs}
  onDownloadPDF={downloadPDF}
  onNewQuiz={() => window.location.reload()}
/>
  );
}

  return (
    <>
      <div
        id="results"
        className="mt-12 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
      >
        {/* Header */}

        <div className="border-b border-zinc-200 bg-zinc-900 px-4 py-5 text-white sm:px-6">
          <h2 className="text-2xl font-bold">
            Practice Questions
          </h2>

          <div className="mt-3 space-y-1 text-sm text-zinc-300">
            <p>
              <span className="font-medium">Topic:</span>{" "}
              {studyMode === "topic" ? topic : "From Notes"}
            </p>

            <p>
              <span className="font-medium">Difficulty:</span>{" "}
              {difficulty}
            </p>

            <p>
              <span className="font-medium">Questions:</span>{" "}
{questionCount === "max"
  ? "Maximum Possible"
  : questionCount}
            </p>
          </div>
        </div>

        {/* Questions */}

        <div className="p-3 sm:p-6">
          {mcqs.map((mcq, index) => (
            <MCQCard
              key={index}
              index={index}
              mcq={mcq}
            />
          ))}
        </div>
      </div>

      {/* Quiz Ready Card */}

      <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-zinc-900">
          🎉 Your quiz is ready!
        </h3>

        <p className="mt-3 text-sm text-zinc-600">
          You've reviewed your generated questions. Continue with an
          interactive quiz or save them as a PDF for later.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
         <Button
    onClick={() => setQuizStarted(true)}
    variant="primary"
    className="w-full"
>
    🎯 Practice Quiz
</Button>

          <Button
    onClick={downloadPDF}
    variant="secondary"
    className="w-full"
>
    📄 Download PDF
</Button>
        </div>
      </div>
    </>
  );
}