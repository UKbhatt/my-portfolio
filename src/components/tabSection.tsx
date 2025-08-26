"use client";
import { useState } from "react";
import TabsBar from "./tab";

export default function SectionWithTabs() {
  const [tab, setTab] = useState<"projects" | "certs" | "stack">("projects");

  return (
    <section className="w-full py-10">
      <TabsBar initial="projects" onChange={setTab} />

      <div className="mt-8">
        {tab === "projects" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-28 rounded-xl bg-white/5 border border-white/10" />
            <div className="h-28 rounded-xl bg-white/5 border border-white/10" />
          </div>
        )}

        {tab === "certs" && (
          <div className="space-y-3">
            <div className="h-12 rounded-lg bg-white/5 border border-white/10" />
            <div className="h-12 rounded-lg bg-white/5 border border-white/10" />
          </div>
        )}

        {tab === "stack" && (
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">React</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Next.js</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Node</span>
          </div>
        )}
      </div>
    </section>
  );
}
