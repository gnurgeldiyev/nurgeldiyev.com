"use client";

import { useEffect, useState } from "react";
import { MoonIcon, MonitorIcon, SunIcon } from "./icons";

type Mode = "light" | "system" | "dark";

function systemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(mode: Mode) {
  const dark = mode === "dark" || (mode === "system" && systemDark());
  document.documentElement.classList.toggle("dark", dark);
}

const OPTIONS: { mode: Mode; label: string; Icon: typeof SunIcon }[] = [
  { mode: "light", label: "Light", Icon: SunIcon },
  { mode: "system", label: "Auto", Icon: MonitorIcon },
  { mode: "dark", label: "Dark", Icon: MoonIcon },
];

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode((localStorage.getItem("theme") as Mode) || "system");

    // In Auto, follow the OS as it changes.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (((localStorage.getItem("theme") as Mode) || "system") === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function choose(next: Mode) {
    setMode(next);
    try {
      // Auto = absence of the key, so the no-flash boot script falls back to OS.
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {}
    apply(next);
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex rounded-full border border-line bg-card p-0.5"
    >
      {OPTIONS.map((o) => {
        const active = mounted && mode === o.mode;
        return (
          <button
            key={o.mode}
            type="button"
            onClick={() => choose(o.mode)}
            aria-label={o.label}
            aria-pressed={active}
            title={o.label}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
              active ? "bg-accent-soft text-accent" : "text-faint hover:text-main"
            }`}
          >
            <o.Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
