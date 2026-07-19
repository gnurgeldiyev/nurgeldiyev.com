"use client";

import { useRef } from "react";
import { events } from "@/config/content";

export default function EventClips() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {events.map((e) => (
        <Clip key={e.video} title={e.title} caption={e.caption} video={e.video} />
      ))}
    </div>
  );
}

function Clip({ title, caption, video }: { title: string; caption: string; video: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="card group relative aspect-[9/14] overflow-hidden p-0"
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const v = ref.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      <video
        ref={ref}
        src={video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
      <div className="pointer-events-none absolute bottom-0 left-0 p-3 text-white">
        <p className="text-sm font-semibold leading-tight drop-shadow">{title}</p>
        <p className="text-xs text-white/75">{caption}</p>
      </div>
    </div>
  );
}
