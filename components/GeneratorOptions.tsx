import SectionTitle from "@/components/SectionTitle";
import Select from "@/components/ui/Select";
type Props = {
  difficulty: string;
  setDifficulty: (value: string) => void;
  questionCount: number;
  setQuestionCount: (value: number) => void;
};

export default function GeneratorOptions({
  difficulty,
  setDifficulty,
  questionCount,
  setQuestionCount,
}: Props) {
  return (
    <>
      <div className="mt-6">
        <SectionTitle>Difficulty</SectionTitle>

        <Select
  value={difficulty}
  onChange={(e) => setDifficulty(e.target.value)}
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</Select>
      </div>

      <div className="mt-6">
        <SectionTitle>Number of Questions</SectionTitle>

        <Select
  value={questionCount}
  onChange={(e) => setQuestionCount(Number(e.target.value))}
>
  <option value={10}>10</option>
  <option value={20}>20</option>
  <option value={50}>50</option>
</Select>
      </div>
    </>
  );
}