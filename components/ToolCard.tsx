import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
};

export default function ToolCard({
  title,
  description,
}: ToolCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      <Link
  href="/mcq-generator"
  className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
>
  Open Tool
</Link>

    </div>
  );
}


