"use client";

import { motion, useAnimation } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const posts = [
  {
    title: "چطور برای عکاسی عروسی آماده شویم؟",
    category: "راهنمای عکاسی",
    date: "۱۲ شهریور ۱۴۰۵",
    image: "/images/slides/sample-1.jpg",
  },
  {
    title: "چرا نور مهم‌ترین عنصر در یک عکس حرفه‌ای است؟",
    category: "آموزش",
    date: "۰۵ شهریور ۱۴۰۵",
    image: "/images/slides/sample-2.jpg",
  },
  {
    title: "انتخاب لوکیشن مناسب برای عکاسی فرمالیته",
    category: "ایده و الهام",
    date: "۲۸ مرداد ۱۴۰۵",
    image: "/images/slides/sample-3.jpg",
  },
  {
    title: "راهنمای کامل عکاسی کودک در آتلیه",
    category: "راهنمای عکاسی",
    date: "۲۰ مرداد ۱۴۰۵",
    image: "/images/slides/sample-1.jpg",
  },
  {
    title: "چیدمان و دکور مناسب برای جشن تولد",
    category: "ایده و الهام",
    date: "۱۴ مرداد ۱۴۰۵",
    image: "/images/slides/sample-3.jpg",
  },
];

// How many cards are visible at once per breakpoint (must match the widths below)
const VISIBLE = { base: 1, sm: 2, lg: 3 };

export default function Blog() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const [index, setIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(posts.length - 1);
  const [isInteracting, setIsInteracting] = useState(false);
  const didDrag = useRef(false);

  // Measure card width (+ gap) and recompute on resize
  useEffect(() => {
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
      setMaxIndex(Math.max(posts.length - visibleCount, 0));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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
    }, 5000);

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

  const handleCardClick = (e: React.MouseEvent) => {
    if (didDrag.current) {
      e.preventDefault();
    }
  };

  const atStart = index <= 0;
  const atEnd = index >= maxIndex;

  return (
    <section
      id="blog"
      className="flex h-[670px] items-center overflow-hidden bg-[#f5f2ec]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-right">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              JOURNAL
            </span>

            <h2 className="mt-2 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
              از دنیای
              <span className="font-medium"> آتلیه بختیاری.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="group flex items-center justify-end gap-2 text-xs text-black/55 transition-colors duration-300 hover:text-[var(--primary-dark)]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-2">
                ←
              </span>
              مشاهده همه مقالات
            </Link>

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
            onDragStart={() => {
              didDrag.current = false;
              setIsInteracting(true);
            }}
            onDrag={(_e, info) => {
              if (Math.abs(info.offset.x) > 4) didDrag.current = true;
            }}
            onDragEnd={handleDragEnd}
            className="flex cursor-grab gap-4 active:cursor-grabbing"
          >
            {posts.map((post) => (
              <Link
                key={post.title}
                href="/blog"
                data-card
                draggable={false}
                onClick={handleCardClick}
                className="group block w-[78%] flex-shrink-0 sm:w-[46%] lg:w-[31.5%]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    draggable={false}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />

                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[9px] tracking-[0.15em] text-[var(--primary-dark)] backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                {/* Meta */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-black/35">
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-2 flex items-start justify-between gap-3">
                  <span className="text-base text-black/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[var(--primary)]">
                    ←
                  </span>

                  <h3 className="text-right text-sm font-medium leading-6 text-[#171512] line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
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
      </div>
    </section>
  );
}