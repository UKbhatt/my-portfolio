"use client";
import { useState } from "react";
import { Code2, Award, Atom } from "lucide-react";

type TabKey = "projects" | "certs" | "stack";

export default function TabsBar({
  onChange,
  initial = "projects",
}: {
  onChange?: (tab: TabKey) => void;
  initial?: TabKey;
}) {
  const [active, setActive] = useState<TabKey>(initial);

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: "projects", label: "Projects",    icon: Code2 },
    { key: "certs",    label: "Certificates", icon: Award },
    { key: "stack",    label: "Tech Stack",   icon: Atom  },
  ];

  const index = tabs.findIndex(t => t.key === active);

  function setTab(k: TabKey) {
    setActive(k);
    onChange?.(k);
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-3xl p-[6px] 
      bg-[radial-gradient(60%_120%_at_50%_0%,rgba(255,0,120,.15),rgba(0,0,0,.2)_60%),
      linear-gradient(90deg,rgba(255,255,255,.06),rgba(255,255,255,.04))] ring-1 ring-white/10">
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-black/40 p-2">
          <div
            className="absolute left-0 top-0 bottom-0 pointer-events-none"
            aria-hidden
          >
            <div
              className="h-[calc(100%-12px)] w-[calc((100%-12px)/3)] rounded-2xl 
              bg-[linear-gradient(180deg,rgba(98,114,255,.35),rgba(40,44,52,.55))] 
                         shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)] 
                         border border-white/10
                         transition-transform duration-300 ease-out translate-x-2 translate-y-2"
              style={{ transform: `translate(calc(${index} * (100% + 12px) + 0.5rem), 0)` }}
            />
          </div>
          {tabs.map(({ key, label, icon: Icon }) => {
            const selected = active === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(key)}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-xl
                            px-4 py-4 text-xl font-semibold tracking-wide
                            transition-colors duration-200
                            ${selected ? "text-white" : "text-zinc-300 hover:text-white/90"}`}
              >
                <Icon size={18} className={selected ? "opacity-100" : "opacity-80"} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
