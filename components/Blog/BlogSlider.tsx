"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Client-only leaf: drag / arrows / dots / autoplay for the blog carousel.
// It owns NO copy. The heading, the "view all" link and the post cards are
// rendered by the server component (Blog.tsx) and passed in as props/children,
// so titles and links stay in the initial HTML.
//
// Cards must be direct children of the track and carry `data-card`
// (used to measure the card width).

export default function BlogSlider({
  heading,
  viewAll,
  count,
  children,
}: {
  /** Eyebrow + <h2> block (server-rendered). */
  heading: ReactNode;
  /** "View all posts" link (server-rendered). */
  viewAll: ReactNode;
  /** Number of cards in the track. */
  count: number;
  /** The post cards. */
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const [index, setIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(count - 1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const didDrag = useRef(false);

  // Measure card width (+ gap) and recompute on resize
  useEffect(() => {
    setMounted(true);

    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const firstCard = track.querySelector<HTMLElement>("[data-card]");
      if (!firstCard) return;

      const gap = 16;
      const step = firstCard.offsetWidth + gap;
      setCardStep(step);

      const visibleCount = Math.round(viewport.offsetWidth / step);
      setMaxIndex(Math.max(count - visibleCount, 0));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);

  // Keep the track animated to the current index (RTL: move opposite way)
  useEffect(() => {
    if (!cardStep) return;
    controls.start({
      x: index * cardStep,
      transition: { type: "spring", stiffness: 260, damping: 32, mass: 0.6 },
    });
  }, [index, cardStep, controls]);

  // Autoplay every 10s, pauses while user is dragging/hovering
  useEffect(() => {
    if (isInteracting) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(timer);
  }, [isInteracting, maxIndex]);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(next, maxIndex));

    if (clamped === index) {
      // Same slide: still animate back to its exact resting position
      controls.start({
        x: clamped * cardStep,
        transition: { type: "spring", stiffness: 260, damping: 32, mass: 0.6 },
      });
    } else {
      setIndex(clamped);
    }
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    setIsInteracting(false);

    if (!cardStep) return;

    // Actual resting x position of the track if we just let momentum settle
    const currentX = index * cardStep;
    const projectedX = currentX + info.offset.x + info.velocity.x * 0.15;

    // Convert x back to an index (x = index * cardStep, so index = x / cardStep)
    const rawIndex = projectedX / cardStep;
    const nearest = Math.round(rawIndex);

    goTo(nearest);
  };

  const atStart = mounted && index <= 0;
  const atEnd = mounted && index >= maxIndex;

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        {heading}

        <div className="flex items-center gap-4">
          {viewAll}

          {/* Arrow controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={atStart}
              aria-label="مقاله قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/50 transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/15 disabled:hover:text-black/50"
            >
              →
            </button>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={atEnd}
              aria-label="مقاله بعدی"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/50 transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/15 disabled:hover:text-black/50"
            >
              ←
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slider viewport */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        ref={viewportRef}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        className="-mx-6 overflow-hidden px-6 pb-2 lg:-mx-12 lg:px-12"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{
            left: 0,
            right: maxIndex * cardStep,
          }}
          dragElastic={0.08}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          animate={controls}
          // A new press always starts "clean"; a drag flips the flag, and the
          // click that follows a drag is swallowed so the card link isn't opened.
          onPointerDownCapture={() => {
            didDrag.current = false;
          }}
          onDragStart={() => {
            didDrag.current = false;
            setIsInteracting(true);
          }}
          onDrag={(_e, info) => {
            if (Math.abs(info.offset.x) > 4) didDrag.current = true;
          }}
          onDragEnd={handleDragEnd}
          onClickCapture={(e) => {
            if (didDrag.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className="flex cursor-grab gap-4 active:cursor-grabbing"
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Progress dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`اسلاید ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-5 bg-[var(--primary)]"
                : "w-1.5 bg-black/15 hover:bg-black/25"
            }`}
          />
        ))}
      </div>
    </>
  );
}
