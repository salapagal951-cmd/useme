type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type Props = {
  mcqs: MCQ[];
  answers: (string | null)[];
  onBack: () => void;
};

import Button from "@/components/Button";

export default function ReviewAnswers({
  mcqs,
  answers,
  onBack,
}: Props) {
  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold text-zinc-900">
        Review Answers
      </h2>

      <div className="space-y-6">
        {mcqs.map((mcq, index) => {
          const selected = answers[index];
          const correct = selected === mcq.answer;

          return (
            <div
              key={index}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-zinc-900">
                {index + 1}. {mcq.question}
              </h3>

              <div className="mt-5 space-y-3">
                {mcq.options.map((option, optionIndex) => {
                  const isCorrect = option === mcq.answer;
                  const isSelected = option === selected;

                  return (
                    <div
 key={optionIndex}
  className={`rounded-xl border p-3 text-zinc-900 ${
                       isCorrect
  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
  : isSelected
  ? "border-red-500 bg-red-50 text-red-900"
  : "border-zinc-200 bg-white text-zinc-800"
                      }`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 text-sm text-zinc-800">
  <p>
    <span className="font-semibold text-zinc-900">
      Your Answer:
    </span>{" "}
    <span
      className={
        selected
          ? "text-zinc-800"
          : "font-medium text-amber-600"
      }
    >
      {selected ?? "Not Answered"}
    </span>
  </p>

  {!correct && (
    <p className="mt-2">
      <span className="font-semibold text-emerald-700">
        Correct Answer:
      </span>{" "}
      <span className="text-zinc-900">
        {mcq.answer}
      </span>
    </p>
  )}
</div>
            </div>
          );
        })}
      </div>

      <Button
        variant="secondary"
        className="mt-8 w-full"
        onClick={onBack}
      >
        ← Back to Results
      </Button>
    </div>
  );
}