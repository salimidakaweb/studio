"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AUTOPLAY_MS = 6000;
const SWIPE_FRACTION = 0.15;
const SETTLE_MS = 480;

type Slide = { image: string; alt: string; caption: string; href: string };

export default function HomeSliderClient({ slides }: { slides: Slide[] }) {
  const count = slides.length;
  const hasLoop = count > 1;

  // trackPos: 0 = cloneLast, 1..count = real slides, count+1 = cloneFirst
  const [trackPos, setTrackPos] = useState(hasLoop ? 1 : 0);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mutable mirrors (so event handlers never read stale state)
  const posRef = useRef(hasLoop ? 1 : 0);
  const busyRef = useRef(false); // an animation is running
  const draggingRef = useRef(false);
  const widthRef = useRef(1);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const movedRef = useRef(false);
  const lockedRef = useRef<"x" | "y" | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);
  const resumeRef = useRef<number | null>(null);

  const realIndex = hasLoop ? (((trackPos - 1) % count) + count) % count : 0;

  // ---- low-level track helpers ------------------------------------------
  // NOTE: the site is dir="rtl". The track is forced to dir="ltr" (see JSX) so
  // that slide N always sits at N * 100% from the left. That way translateX
  // math is identical in LTR and RTL and the clones line up correctly.
  const setTransition = useCallback((on: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = on
      ? `transform ${SETTLE_MS}ms cubic-bezier(0.22,1,0.36,1)`
      : "none";
  }, []);

  const setTransform = useCallback((pos: number, dragPx = 0) => {
    const el = trackRef.current;
    if (!el) return;
    const w = widthRef.current || 1;
    el.style.transform = `translate3d(${-pos * 100 + (dragPx / w) * 100}%,0,0)`;
  }, []);

  // Jump (no animation) to a position. Forces a reflow so the browser commits
  // the un-animated position before transitions are turned back on.
  const jumpTo = useCallback(
    (pos: number) => {
      const el = trackRef.current;
      setTransition(false);
      posRef.current = pos;
      setTrackPos(pos);
      setTransform(pos, 0);
      if (el) void el.offsetWidth; // reflow
      setTransition(true);
    },
    [setTransition, setTransform]
  );

  // After an animation finishes: if we are sitting on a clone, silently jump
  // to its real twin.
  const finishAnimation = useCallback(() => {
    if (fallbackRef.current) {
      window.clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
    const pos = posRef.current;
    if (pos === 0) jumpTo(count);
    else if (pos === count + 1) jumpTo(1);
    busyRef.current = false;
  }, [count, jumpTo]);

  const goToPos = useCallback(
    (nextPos: number) => {
      if (busyRef.current || draggingRef.current) return;
      busyRef.current = true;
      setTransition(true);
      posRef.current = nextPos;
      setTrackPos(nextPos);
      setTransform(nextPos, 0);
      // Safety net: transitionend is not guaranteed (hidden tab, reduced
      // motion, interrupted transition...). Never leave the slider locked.
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
      fallbackRef.current = window.setTimeout(finishAnimation, SETTLE_MS + 120);
    },
    [finishAnimation, setTransition, setTransform]
  );

  const next = useCallback(() => {
    if (hasLoop) goToPos(posRef.current + 1);
  }, [hasLoop, goToPos]);

  const prev = useCallback(() => {
    if (hasLoop) goToPos(posRef.current - 1);
  }, [hasLoop, goToPos]);

  const goToIndex = useCallback(
    (target: number) => {
      if (!hasLoop || busyRef.current || draggingRef.current) return;
      const cur = (((posRef.current - 1) % count) + count) % count;
      if (target === cur) return;
      const diff = (target - cur + count) % count;
      if (diff === 1) next();
      else if (diff === count - 1) prev();
      else jumpTo(target + 1); // far jump: instant, no long sweep
    },
    [hasLoop, count, next, prev, jumpTo]
  );

  // ---- lifecycle -----------------------------------------------------------
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // initial position (no animation) + keep width up to date
  useEffect(() => {
    const measure = () => {
      widthRef.current = rootRef.current?.clientWidth || 1;
      if (!draggingRef.current && !busyRef.current) {
        setTransition(false);
        setTransform(posRef.current, 0);
        void trackRef.current?.offsetWidth;
        setTransition(true);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rootRef.current) ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, [setTransition, setTransform]);

  // autoplay (also pauses when the tab is hidden)
  useEffect(() => {
    if (!hasLoop || paused || dragging) return;
    const t = window.setInterval(() => {
      if (document.hidden) return;
      next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [hasLoop, paused, dragging, next]);

  // if the tab was hidden mid-animation, make sure we are not stuck on a clone
  useEffect(() => {
    const onVisible = () => {
      if (!document.hidden && busyRef.current) finishAnimation();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [finishAnimation]);

  useEffect(
    () => () => {
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    },
    []
  );

  // ---- pointer / swipe -----------------------------------------------------
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!hasLoop || busyRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    widthRef.current = rootRef.current?.clientWidth || 1;
    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    movedRef.current = false;
    lockedRef.current = null;
    draggingRef.current = true;
    setDragging(true);
    setPaused(true);
    setTransition(false);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // decide axis once, so vertical page scroll on touch still works
    if (!lockedRef.current) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      lockedRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (lockedRef.current === "x") {
        try {
          rootRef.current?.setPointerCapture(e.pointerId);
        } catch {}
      }
    }
    if (lockedRef.current === "y") return;

    movedRef.current = true;
    const w = widthRef.current || 1;
    const clamped = Math.max(Math.min(dx, w), -w);
    setTransform(posRef.current, clamped);
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>, cancelled: boolean) {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
    pointerIdRef.current = null;
    draggingRef.current = false;
    setDragging(false);
    try {
      rootRef.current?.releasePointerCapture(e.pointerId);
    } catch {}

    const dx = e.clientX - startXRef.current;
    const w = widthRef.current || 1;
    const horizontal = lockedRef.current === "x";
    lockedRef.current = null;

    const resume = () => {
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
      resumeRef.current = window.setTimeout(() => setPaused(false), SETTLE_MS);
    };

    if (cancelled || !horizontal || Math.abs(dx) < w * SWIPE_FRACTION) {
      setTransition(true);
      setTransform(posRef.current, 0); // snap back
      resume();
      return;
    }
    // finger moves left (dx<0) -> go to next slide
    goToPos(posRef.current + (dx < 0 ? 1 : -1));
    resume();
  }

  // a drag must not trigger the slide link
  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  }

  // ---- render ----------------------------------------------------------------
  const trackItems = hasLoop ? [slides[count - 1], ...slides, slides[0]] : slides;

  return (
    <div
      ref={rootRef}
      dir="ltr"
      className={`relative h-[70svh] min-h-[440px] w-full select-none overflow-hidden bg-[#0F1B22] lg:h-[78svh] ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
        touchAction: "pan-y",
        cursor: hasLoop ? (dragging ? "grabbing" : "grab") : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => endDrag(e, false)}
      onPointerCancel={(e) => endDrag(e, true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!draggingRef.current) setPaused(false);
      }}
      onClickCapture={onClickCapture}
    >
      <div
        ref={trackRef}
        className="flex h-full w-full"
        style={{
          transform: `translate3d(${hasLoop ? -100 : 0}%,0,0)`,
          willChange: "transform",
        }}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.propertyName !== "transform") return;
          if (busyRef.current) finishAnimation();
        }}
      >
        {trackItems.map((slide, i) => {
          const isClone = hasLoop && (i === 0 || i === trackItems.length - 1);
          return (
            <div
              key={`${slide.image}-${i}`}
              className="relative h-full w-full shrink-0 basis-full overflow-hidden"
              aria-hidden={isClone || undefined}
            >
              <Image
                src={slide.image}
                alt={isClone ? "" : slide.alt}
                fill
                priority={i === (hasLoop ? 1 : 0)}
                sizes="100vw"
                draggable={false}
                className="pointer-events-none object-cover"
              />
              {/* soft gradient so the caption is always readable */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

              <div className="absolute inset-x-0 bottom-14 z-10 flex justify-center px-4 sm:bottom-16">
                <Link
                  href={slide.href}
                  tabIndex={isClone ? -1 : 0}
                  dir="rtl"
                  draggable={false}
                  className="rounded-full border border-white/40 bg-black/25 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[var(--ink)] sm:text-base"
                >
                  {slide.caption}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {hasLoop && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="اسلاید قبلی"
            className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/15 sm:flex"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="اسلاید بعدی"
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/15 sm:flex"
          >
            →
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={`${s.image}-dot-${i}`}
                type="button"
                onClick={() => goToIndex(i)}
                aria-label={`نمایش اسلاید ${i + 1}`}
                aria-current={i === realIndex}
                className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ${
                  i === realIndex ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}