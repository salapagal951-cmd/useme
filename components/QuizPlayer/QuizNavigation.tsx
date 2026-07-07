import Button from "@/components/Button";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function QuizNavigation({
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onSubmit,
}: Props) {
  return (
    <div className="mt-6 flex justify-between gap-4">
      <Button
    onClick={onPrevious}
    disabled={isFirst}
    variant="outline"
    className="flex-1"
>
    Previous
</Button>

      {isLast ? (
       <Button
    onClick={onSubmit}
    variant="success"
    className="flex-1"
>
    Submit Quiz
</Button>
      ) : (
        <Button
    onClick={onNext}
    variant="primary"
    className="flex-1"
>
    Next
</Button>
      )}
    </div>
  );
}