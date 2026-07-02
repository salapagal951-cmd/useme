type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type MCQCardProps = {
  index: number;
  mcq: MCQ;
};

export default function MCQCard({
  index,
  mcq,
}: MCQCardProps) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">

      {/* Question Number */}

      <div className="mb-5">

        <span className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
          Question {index + 1}
        </span>

      </div>

      {/* Question */}

      <h2 className="text-xl font-semibold leading-9 text-zinc-900">
        {mcq.question}
      </h2>

      {/* Options */}

      <div className="mt-6 space-y-3">

        {mcq.options.map((option, i) => (

          <div
            key={i}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-800 transition hover:border-blue-200 hover:bg-blue-50"
          >

            <span className="mr-3 font-bold">
              {String.fromCharCode(65 + i)}.
            </span>

            {option}

          </div>

        ))}

      </div>

      {/* Answer */}

      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">

        <p className="font-semibold text-green-700">
          ✅ Correct Answer
        </p>

        <p className="mt-2 text-zinc-900">
          {mcq.answer}
        </p>

      </div>

    </div>
  );
}