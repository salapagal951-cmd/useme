import Button from "@/components/Button";

type Props = {
  score: number;
  total: number;
  hasWrongQuestions: boolean;
  onRetryWrong: () => void;
  onReview: () => void;
  onDownloadPDF: () => void;
  onNewQuiz: () => void;
};

export default function QuizResult({
  score,
  total,
  hasWrongQuestions,
  onRetryWrong,
  onReview,
  onDownloadPDF,
  onNewQuiz,
}: Props) {
  const accuracy = Math.round((score / total) * 100);

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-center text-zinc-900">
        🎉 Quiz Completed
      </h2>

      <p className="mt-6 text-center text-5xl font-bold text-blue-600">
        {score} / {total}
      </p>

      <p className="mt-2 text-center text-zinc-600">
        Accuracy: {accuracy}%
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-emerald-50 p-5 text-center">
          <p className="text-sm text-zinc-600">Correct</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {score}
          </p>
        </div>

        <div className="rounded-2xl bg-red-50 p-5 text-center">
          <p className="text-sm text-zinc-600">Incorrect</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {total - score}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button onClick={onReview}>
          Review Answers
        </Button>

        {hasWrongQuestions ? (
  <Button onClick={onRetryWrong}>
    Retry Wrong Questions
  </Button>
) : (
  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
    🎉 Perfect! You answered every question correctly.
  </div>
)}

        <Button
          variant="secondary"
          onClick={onDownloadPDF}
        >
          Download PDF
        </Button>

        <Button
          variant="outline"
          onClick={onNewQuiz}
        >
          Generate New Quiz
        </Button>
      </div>
    </div>
  );
}