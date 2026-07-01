"use client";

import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-bold text-center">
          UseMe
        </h1>

        <p className="mt-4 text-center text-gray-600 text-lg">
          Learn Smarter. Achieve Faster.
        </p>

        <p className="mt-2 text-center text-gray-500">
          AI-powered tools that save hours of study time.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
            />
          ))}

        </div>

      </div>

    </main>
  );
}