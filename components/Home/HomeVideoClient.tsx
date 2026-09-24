"use client";

import Image from "next/image";
import { useState } from "react";

// Client-only leaf: click-to-play video. The <video> is only mounted after the
// visitor presses play (nothing heavy is downloaded up front). The poster image
// (with alt text) is part of the server HTML; the title/description live in
// HomeAboutVideo.tsx (server).

export default function HomeVideoClient({
  src,
  poster,
  posterAlt,
  title,
}: {
  src?: string;
  poster: string;
  posterAlt: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black shadow-[0_20px_45px_-20px_rgba(20,18,15,0.4)]">
      {playing && src ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />

          <button
            type="button"
            disabled={!src}
            onClick={() => setPlaying(true)}
            aria-label={`پخش ${title}`}
            className="absolute inset-0 flex items-center justify-center disabled:cursor-default"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[var(--primary-dark)] shadow-lg transition-transform duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          <span className="absolute bottom-3 right-4 text-sm font-medium text-white">
            {title}
          </span>
        </>
      )}
    </div>
  );
}
