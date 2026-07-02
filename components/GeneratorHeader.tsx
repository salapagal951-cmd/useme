import Badge from "@/components/ui/Badge";

type GeneratorHeaderProps = {
  loading: boolean;
};

export default function GeneratorHeader({
  loading,
}: GeneratorHeaderProps) {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        Generate Practice Questions
      </h1>

      <p className="mt-3 max-w-2xl text-zinc-600">
        Turn any topic or notes into exam-ready multiple choice questions in
        seconds.
      </p>

      <div className="mt-5 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700">
       <Badge>v0.1 Beta</Badge>
        {loading && (
          <span className="ml-2 font-medium">
            • Generating...
          </span>
        )}
      </div>
    </>
  );
}