import Button from "@/components/Button";

type Props = {
  unanswered: number;
  onReview: () => void;
  onSubmit: () => void;
};

export default function SubmitDialog({
  unanswered,
  onReview,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-zinc-900">
          Unanswered Questions
        </h2>

        <p className="mt-4 text-zinc-600">
          You still have <b>{unanswered}</b> unanswered{" "}
          {unanswered === 1 ? "question" : "questions"}.
        </p>

        <p className="mt-2 text-zinc-600">
          You can review them first or submit your quiz now.
        </p>

        <div className="mt-6 grid gap-3">
          <Button
            variant="outline"
            onClick={onReview}
          >
            Review Questions
          </Button>

          <Button onClick={onSubmit}>
            Submit Anyway
          </Button>
        </div>
      </div>
    </div>
  );
}