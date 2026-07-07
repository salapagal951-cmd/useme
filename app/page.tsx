"use client";

import ToolCard from "@/components/ToolCard";
import Badge from "@/components/ui/Badge";
import { tools } from "@/data/tools";
import {
  Brain,
  FileText,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="grid items-center gap-16 py-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left */}
          <div>
            <Badge>AI-Powered Study Platform</Badge>

            <h1 className="mt-6 text-6xl font-black tracking-tight text-zinc-900 lg:text-7xl">
              Study<span className="text-blue-600">Dif</span>
            </h1>

            <p className="mt-6 text-2xl font-semibold text-zinc-800">
              AI that helps students study differently.
            </p>

            <p className="mt-6 max-w-xl text-xl leading-9 text-zinc-600">
              Generate quizzes from topics, notes, PDFs, and images. Study smarter with AI-powered learning tools.
            </p>

            {/* Feature Pills */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="font-medium text-zinc-700">
                  Free Beta
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="font-medium text-zinc-700">
                  No Login Required
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm">
                <Sparkles size={18} className="text-blue-600" />
                <span className="font-medium text-zinc-700">
                  AI Powered
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="absolute h-80 w-80 rounded-full bg-blue-100 opacity-70 blur-[90px]" />

            <div className="relative flex flex-col gap-6">
              {/* Card 1 */}
              <div className="ml-12 flex w-64 rotate-6 items-center gap-4 rounded-3xl border border-zinc-200 bg-white px-6 py-5 shadow-xl transition hover:-translate-y-1">
                <div className="rounded-2xl bg-red-100 p-3">
                  <FileText size={24} className="text-red-500" />
                </div>

                <div>
                  <p className="font-semibold text-zinc-900">
                    Study Material
                  </p>

                  <p className="text-sm text-zinc-600">
                    Notes • PDFs
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="z-10 flex w-72 items-center gap-4 rounded-3xl bg-blue-600 px-6 py-6 text-white shadow-2xl transition hover:scale-105">
                <div className="rounded-2xl bg-white/20 p-3">
                  <Brain size={26} />
                </div>

                <div>
                  <p className="font-semibold">
                    AI Processing
                  </p>

                  <p className="text-sm text-blue-100">
                    Smart Quiz Generation
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="-ml-8 flex w-64 -rotate-6 items-center gap-4 rounded-3xl border border-zinc-200 bg-white px-6 py-5 shadow-xl transition hover:translate-y-1">
                <div className="rounded-2xl bg-emerald-100 p-3">
                  <Brain size={24} className="text-emerald-600" />
                </div>

                <div>
                  <p className="font-semibold text-zinc-900">
                    Interactive Quiz
                  </p>

                  <p className="text-sm text-zinc-600">
                    Learn • Practice • Improve
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Study Tools */}
        <section className="mt-12">
          <div className="mb-8 flex items-start gap-3">
            <Brain className="mt-1 text-blue-600" size={24} />

            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Study Tools
              </h2>

              <p className="mt-2 text-zinc-700">
                Choose the tool that matches your learning style.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
  <ToolCard
    key={tool.id}
    title={tool.title}
    description={tool.description}
    href={tool.href}
    available={tool.available}
  />
))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-zinc-200 pt-8 text-center">
          <p className="font-medium text-zinc-700">
            StudyDif
          </p>

          <p className="mt-2 text-sm text-zinc-700">
            AI that helps students study differently.
          </p>

          <p className="mt-6 text-xs text-zinc-400">
            Beta v0.1
          </p>
        </footer>
      </div>
    </main>
  );
}