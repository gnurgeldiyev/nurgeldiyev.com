"use client";

import { useEffect, useRef } from "react";
import { poemLines } from "@/config/content";

const items = poemLines.map((text, id) => ({ text, id }));

// A horizontally auto-scrolling poem ticker you can grab and flick — like a
// camera/Apple-Watch dial. Drag to scrub, release to let momentum carry it,
// then it eases back into a slow idle drift.
export default function PoemTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLDivElement>(null);
  const st = useRef({
    x: 0,
    runW: 0,
    dragging: false,
    hover: false,
    lastX: 0,
    lastT: 0,
    vel: 0,
    momentum: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      st.current.runW = runRef.current?.offsetWidth ?? 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (runRef.current) ro.observe(runRef.current);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LOOP_SECONDS = 180; // one full poem loop when idle

    let raf = 0;
    const render = () => {
      const s = st.current;
      const w = s.runW || 1;
      // Idle drift derived from width so a full loop always takes ~90s at 60fps.
      const auto = reduce ? 0 : -(w / (LOOP_SECONDS * 60));
      if (!s.dragging) {
        if (Math.abs(s.momentum) > 0.03) {
          s.x += s.momentum;
          s.momentum *= 0.95; // inertia decay — the flywheel feel
        } else if (!s.hover) {
          s.x += auto;
        }
      }
      // Seamless wrap
      if (s.x <= -w) s.x += w;
      else if (s.x > 0) s.x -= w;
      track.style.transform = `translate3d(${s.x}px,0,0)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const s = st.current;
    s.dragging = true;
    s.momentum = 0;
    s.vel = 0;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.x += dx;
    const dt = e.timeStamp - s.lastT;
    if (dt > 0) s.vel = dx / dt; // px per ms
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;
  };

  const onUp = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    s.dragging = false;
    // Convert drag velocity to per-frame momentum, clamped
    s.momentum = Math.max(-48, Math.min(48, s.vel * 16));
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      className="ticker-mask mt-7 cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onMouseEnter={() => {
        st.current.hover = true;
      }}
      onMouseLeave={() => {
        st.current.hover = false;
      }}
      aria-hidden
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <PoemRun innerRef={runRef} />
        <PoemRun />
      </div>
    </div>
  );
}

function PoemRun({ innerRef }: { innerRef?: React.Ref<HTMLDivElement> }) {
  const last = items.length - 1;
  return (
    <div ref={innerRef} className="flex shrink-0 items-center">
      {items.map((item, idx) => (
        <span key={item.id} className="inline-flex items-center">
          <span className="whitespace-nowrap px-5 font-display text-[15px] italic text-soft">
            {item.text}
          </span>
          {idx === last ? (
            <span className="px-2 text-base">🪶</span>
          ) : (
            <span className="text-xs text-accent">✦</span>
          )}
        </span>
      ))}
    </div>
  );
}
