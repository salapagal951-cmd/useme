"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import SectionTitle from "@/components/SectionTitle";
import MCQCard from "@/components/MCQCard";
import { jsPDF } from "jspdf";
import GeneratorHeader from "@/components/GeneratorHeader";
import StudyMode from "@/components/StudyMode";
import TopicNotesSection from "@/components/TopicNotesSection";
import GeneratorOptions from "@/components/GeneratorOptions";
import ResultsSection from "@/components/ResultsSection";
import ErrorCard from "@/components/ErrorCard";
import { downloadQuizPDF } from "@/lib/pdf-generator";
type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

export default function MCQGenerator() {
  const [studyMode, setStudyMode] = useState<"topic" | "notes">("topic");

  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState<number | "max">(10);

  const [loading, setLoading] = useState(false);

  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  
   function downloadPDF() {
  const fileName = `${
    (studyMode === "topic" ? topic : "Practice-Questions")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-")
  }-${new Date().toISOString().split("T")[0]}.pdf`;

  downloadQuizPDF({
    mcqs,
    title: studyMode === "topic" ? topic : "From Notes",
    difficulty,
    questionCount,
    fileName,
  });
}

  

  async function generateMCQs() {
    if (studyMode === "topic" && !topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    if (studyMode === "notes" && !notes.trim()) {
      alert("Please paste your notes.");
      return;
    }

    setLoading(true);
    setMcqs([]);

    try {
      const response = await fetch("/api/generate-mcq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyMode,
          topic,
          notes,
          difficulty,
          questionCount,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.message);
        setLoading(false);
        return;
      }

      setMcqs(data.result);

      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
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

       <GeneratorHeader loading={loading} />

        <div className="mt-8 flex gap-3">

          <StudyMode
  studyMode={studyMode}
  setStudyMode={setStudyMode}
/>

        </div>

       <TopicNotesSection
  studyMode={studyMode}
  topic={topic}
  setTopic={setTopic}
  notes={notes}
  setNotes={setNotes}
/>

      

       <GeneratorOptions
  studyMode={studyMode}
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  questionCount={questionCount}
  setQuestionCount={setQuestionCount}
/>

       <ErrorCard
  errorMessage={errorMessage}
  setTopic={setTopic}
  setErrorMessage={setErrorMessage}
/>

        <Button
          onClick={generateMCQs}
          disabled={loading}
          className="mt-8 w-full py-4"
        >
          {loading
            ? "✨ Generating Questions..."
            : "✨ Generate Questions"}
        </Button>
              

          <ResultsSection
          
  mcqs={mcqs}
  studyMode={studyMode}
  topic={topic}
  difficulty={difficulty}
  questionCount={questionCount}
  downloadPDF={downloadPDF}
/>
{mcqs.length > 0 && (
  <div className="h-4" />
)}

      </div>

    </main>
  );
}