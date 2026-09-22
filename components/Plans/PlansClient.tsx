"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Client-only leaves for the Plans section. None of them own any copy: titles,
// prices and feature lists are rendered by the server component (Plans.tsx) and
// passed in as `children`, so they stay in the initial HTML.

/* ---------------------------------------------------------------- Card shell */
/** Entrance animation + 3D tilt + mouse spotlight around one plan card. */
export function PlanCardShell({
  index,
  featured,
  children,
}: {
  index: number;
  featured: boolean;
  children: ReactNode;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const spotlightX = useTransform(springX, [-0.5, 0.5], [-120, 120]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], [-120, 120]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-plan-card
      className="group relative w-[82%] shrink-0 snap-center sm:w-[60%] md:w-[46%] lg:w-auto lg:shrink lg:snap-align-none"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-px rounded-sm opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100 ${featured ? "bg-[var(--primary)]/30" : "bg-white/20"
          }`}
      />

      <div
        className={`relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-sm border p-5 transition-all duration-700 lg:p-6 ${featured
          ? "border-[var(--primary-dark)]/30 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-dark)] text-white shadow-[0_20px_45px_-18px_rgba(var(--primary-rgb),0.5)]"
          : "border-black/10 bg-white text-[#171512] shadow-[0_10px_30px_-18px_rgba(20,18,15,0.25)]"
          }`}
      >
        {/* Mouse Spotlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: featured
              ? "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 55%)"
              : "radial-gradient(circle, rgba(20,18,15,0.05) 0%, transparent 55%)",
            x: spotlightX,
            y: spotlightY,
          }}
        />

        {children}
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------- Small animated pieces */
/** Big decorative "01 / 02 / 03" number in the card corner. */
export function PlanNumber({
  index,
  featured,
}: {
  index: number;
  featured: boolean;
}) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
      className={`absolute -bottom-5 -left-2 text-[90px] font-light leading-none transition-transform duration-1000 group-hover:-translate-y-3 ${featured ? "text-white/10" : "text-black/[0.04]"
        }`}
    >
      0{index + 1}
    </motion.span>
  );
}

/** One feature row (text is passed in as children from the server). */
export function PlanFeature({
  index,
  featureIndex,
  featured,
  children,
}: {
  index: number;
  featureIndex: number;
  featured: boolean;
  children: ReactNode;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 + featureIndex * 0.08 + 0.5 }}
      className={`flex items-center gap-2.5 text-[13px] ${featured ? "text-white/85" : "text-black/65"
        }`}
    >

      <span
        aria-hidden="true"
        className={`h-1 w-1 rounded-full transition-transform duration-300 group-hover:scale-150 ${featured ? "bg-white/70" : "bg-[var(--primary)]/60"
          }`}
      />
      <span>{children}</span>

    </motion.li>
  );
}

/** Thin line that grows along the bottom edge of the card. */
export function PlanBottomLine({
  index,
  featured,
}: {
  index: number;
  featured: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute bottom-0 right-0 h-[2px] w-full origin-right ${featured ? "bg-white/30" : "bg-[var(--primary)]/30"
        }`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.15 + 0.8 }}
    />
  );
}

/* ------------------------------------------------------------------ Carousel */
/**
 * Horizontal snap carousel on mobile/tablet, 3-column grid on desktop, plus the
 * progress dots. The cards themselves are server-rendered and passed as children.
 */
export function PlansCarousel({
  labels,
  children,
}: {
  /** One label per card (used for the dots' aria-labels). */
  labels: string[];
  children: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  // Mobile/tablet: start on the featured (middle) card, and track which card is centered
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-plan-card]")
    );

    const isCarousel = () => window.matchMedia("(max-width: 1023px)").matches;

    const centerCard = (i: number, smooth: boolean) => {
      const card = cards[i];
      if (!card) return;
      const left =
        card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
      scroller.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    };

    if (isCarousel()) centerCard(1, false);

    const onScroll = () => {
      if (!isCarousel()) return;
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const goToCard = (i: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelectorAll<HTMLElement>("[data-plan-card]")[i];
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Cards: horizontal snap carousel on mobile/tablet, 3-col grid on desktop */}
      <div
        ref={scrollerRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0"
      >
        {children}
      </div>

      {/* Progress dots (mobile/tablet only) */}
      <div className="mt-1 flex justify-center gap-1.5 lg:hidden">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => goToCard(i)}
            aria-label={`نمایش ${label}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active
              ? "w-5 bg-[var(--primary)]"
              : "w-1.5 bg-black/15 hover:bg-black/25"
              }`}
          />
        ))}
      </div>
    </>
  );
}
