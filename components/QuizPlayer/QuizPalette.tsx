type Props = {
  currentQuestion: number;
  answers: (string | null)[];
  onJump: (index: number) => void;
};

export default function QuizPalette({
  currentQuestion,
  answers,
  onJump,
}: Props) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-zinc-700">
        Question Palette
      </p>

      <div className="flex flex-wrap gap-2">
        {answers.map((answer, index) => {
          const isCurrent = currentQuestion === index;
          const isAnswered = answer !== null;

          return (
            <button
              key={index}
              onClick={() => onJump(index)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                isCurrent
                  ? "border-blue-600 bg-blue-600 text-white"
                  : isAnswered
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-400"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}