import Link from "next/link";
import {
  ArrowRight,
  Brain,
  FileText,
  Image,
  Lock,
  NotebookPen,
  Layers3,
} from "lucide-react";

type ToolCardProps = {
  title: string;
  description: string;
  href?: string;
  available?: boolean;
};

export default function ToolCard({
  title,
  description,
  href = "#",
  available = false,
}: ToolCardProps) {
  function getIcon() {
    if (title.includes("MCQ"))
      return <Brain size={26} className="text-blue-600" />;

    if (title.includes("PDF"))
      return <FileText size={26} className="text-red-500" />;

    if (title.includes("Image"))
      return <Image size={26} className="text-emerald-500" />;

    if (title.includes("Notes"))
      return <NotebookPen size={26} className="text-orange-500" />;

    return <Layers3 size={26} className="text-violet-500" />;
  }

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 transition group-hover:bg-blue-50">
        {getIcon()}
      </div>

      <h2 className="mt-6 text-2xl font-bold text-zinc-900">
        {title}
      </h2>

      <p className="mt-4 flex-1 leading-7 text-zinc-500">
        {description}
      </p>

      <div className="mt-8 border-t border-zinc-100 pt-6">

        {available ? (
          <Link
            href={href}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 font-semibold text-white transition-all hover:bg-blue-700"
          >
            Open
            <ArrowRight size={18} />
          </Link>
        ) : (
          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 font-medium text-zinc-500"
          >
            <Lock size={16} />
            Coming Soon
          </button>
        )}

      </div>

    </div>
  );
}