import Button from "@/components/Button";
import MCQCard from "@/components/MCQCard";

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
  questionCount: number;
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
  if (mcqs.length === 0) return null;

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
              {questionCount}
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

      {/* Download */}

      <Button
        onClick={downloadPDF}
        className="mt-8 w-full bg-zinc-900 hover:bg-zinc-800"
      >
        📄 Download PDF
      </Button>
    </>
  );
}