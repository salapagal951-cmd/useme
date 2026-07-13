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

import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <Hero />

 


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
            v0.3 Beta
Featuring Bhidu 😎
          </p>
        </footer>
      </div>
    </main>
  );
}