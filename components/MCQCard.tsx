type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type MCQCardProps = {
  index: number;
  mcq: MCQ;
};

export default function MCQCard({ index, mcq }: MCQCardProps) {
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Question Number */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
          Question {index + 1}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-1g font-semibold leading-8 text-black">
        {mcq.question}
      </h2>

      {/* Options */}
      <div className="mt-4 space-y-2">
        {mcq.options.map((option, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-black transition hover:bg-gray-100"
          >
            <span className="mr-2 font-bold">
              {String.fromCharCode(65 + i)}.
            </span>

            {option}
          </div>
        ))}
      </div>

      {/* Answer */}
      <div className="mt-4 rounded-1g border border-green-200 bg-green-50 p-4">
        <span className="font-semibold text-green-700">
          ✅ Correct Answer:
        </span>

        <span className="ml-2 text-black">
          {mcq.answer}
        </span>
      </div>

    </div>
  );
}