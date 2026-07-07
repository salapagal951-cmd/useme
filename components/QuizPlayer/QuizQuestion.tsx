type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type QuizQuestionProps = {
  mcq: MCQ;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
};

export default function QuizQuestion({
  mcq,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">
            Practice Quiz
          </h2>

          <span className="text-sm font-medium text-zinc-700">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
     <h3 className="mt-6 text-2xl font-semibold leading-9 text-zinc-900">
        {mcq.question}
      </h3>

      {/* Options */}
      <div className="mt-8 space-y-4">
        {mcq.options.map((option, optionIndex) => {
          const selected = selectedAnswer === option;

          return (
            <button
 key={optionIndex}
  onClick={() => onSelectAnswer(option)}
  className={`w-full rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 ${
    selected
      ? "border-blue-600 bg-blue-50 text-zinc-900 shadow-sm"
      : "border-zinc-200 bg-white text-zinc-800 hover:border-blue-300 hover:bg-blue-50"
  }`}
>
  <div className="flex items-center gap-4">
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
        selected
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-zinc-300 bg-white text-zinc-600"
      }`}
    >
      {String.fromCharCode(65 + optionIndex)}
    </div>

    <span className="font-medium">
      {option}
    </span>
  </div>
</button>
          );
        })}
      </div>
    </div>
  );
}