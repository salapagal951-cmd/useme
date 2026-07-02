type Props = {
  errorMessage: string;
  setTopic: (value: string) => void;
  setErrorMessage: (value: string) => void;
};

const topics = [
  "Artificial Intelligence",
  "World History",
  "Python",
  "Machine Learning",
  "Human Anatomy",
  "Climate Change",
];

export default function ErrorCard({
  errorMessage,
  setTopic,
  setErrorMessage,
}: Props) {
  if (!errorMessage) return null;

  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
      <h3 className="font-semibold text-amber-800">
        {errorMessage}
      </h3>

      <p className="mt-2 text-sm text-amber-700">
        Check the spelling or try one of these topics.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((item) => (
          <button
            key={item}
            onClick={() => {
              setTopic(item);
              setErrorMessage("");
            }}
            className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}