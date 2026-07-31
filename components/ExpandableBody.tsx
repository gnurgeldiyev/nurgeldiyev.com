"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "./icons";

// Roughly six lines of the card's 15px/1.7 body type. List cards stay a
// consistent height until you open one.
const COLLAPSED_PX = 156;
// Don't clamp a body that only just overflows — a "Read more" that reveals one
// extra line is more annoying than the line itself.
const SLACK_PX = 40;

// Wraps a server-rendered post body in a list card and clamps it, with a fade
// at the cut and a control that expands it in place. Height is animated from
// the measured content height, then released to `none` once open so later
// reflow (fonts, resize) can't clip anything.
export default function ExpandableBody({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const full = useRef(0);
  const [measured, setMeasured] = useState(false);
  const [expandable, setExpandable] = useState(false);
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const id = useId();

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    // scrollHeight reports the full content height even while max-height and
    // overflow:hidden are clamping the box.
    const measure = () => {
      full.current = el.scrollHeight;
      setExpandable(el.scrollHeight > COLLAPSED_PX + SLACK_PX);
      setMeasured(true);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggle = () => {
    full.current = box.current?.scrollHeight ?? 0;
    if (open) {
      // Pin the height back to a pixel value before collapsing, since
      // `none` -> a length doesn't animate.
      setSettled(false);
      requestAnimationFrame(() => setOpen(false));
    } else {
      setSettled(false);
      setOpen(true);
    }
  };

  // Clamp before the first measurement too, so a long body never flashes at
  // full height on load. max-height (not height) means short bodies are
  // unaffected either way.
  const maxHeight = open
    ? settled
      ? "none"
      : full.current
    : !measured || expandable
      ? COLLAPSED_PX
      : undefined;

  return (
    <div className="mt-3">
      <div
        id={id}
        ref={box}
        className="relative overflow-hidden motion-safe:transition-[max-height] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ maxHeight }}
        onTransitionEnd={(e) => {
          if (e.propertyName === "max-height" && open) setSettled(true);
        }}
      >
        {children}
        {expandable && !open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-[var(--surface)]"
          />
        )}
      </div>

      {expandable && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={id}
          className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-soft transition-colors hover:text-accent"
        >
          {open ? "Show less" : "Read more"}
          <ChevronDownIcon
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}
