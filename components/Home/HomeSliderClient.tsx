"use client";

import { useEffect, useState, type ReactNode } from "react";

// Client-only leaf: autoplay + arrows + dots for the home slider.
// It owns NO copy. Every slide (image, caption, link) is rendered by the server
// component (HomeSlider.tsx) and passed in as `children`, one node per slide,
// so all slide content stays in the initial HTML for crawlers. Slides are
// stacked and only cross-faded with opacity (never removed from the DOM).

const AUTOPLAY_MS = 6000;

export default function HomeSliderClient({
  count,
  children,
  slides,
  labels,
}: {
  count: number;
  /** One server-rendered node per slide (same order as `labels`). */
  slides: ReactNode[];
  /** aria-labels for the dots. */
  labels: string[];
  /** Static overlay content (h1, paragraph, CTAs) rendered by the server. */
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div
      className="relative h-[70svh] min-h-[440px] w-full overflow-hidden bg-[#0F1B22] lg:h-[78svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {slide}
        </div>
      ))}

      {/* Static content (server-rendered) */}
      {children}

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="اسلاید بعدی"
            className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/15 sm:flex"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="اسلاید قبلی"
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/15 sm:flex"
          >
            →
          </button>

          <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2">
            {labels.map((label, i) => (
              <button
                key={label + i}
                type="button"
                onClick={() => go(i)}
                aria-label={`نمایش ${label}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
