"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "عروسی",
    href: "/portfolio/wedding",
    image: "/images/slides/sample-1.jpg",
  },
  {
    title: "عقد",
    href: "/portfolio/ceremony",
    image: "/images/slides/sample-2.jpg",
  },
  {
    title: "فرمالیته",
    href: "/portfolio/formality",
    image: "/images/slides/sample-3.jpg",
  },
  {
    title: "پرتره",
    href: "/portfolio/portrait",
    image: "/images/slides/sample-1.jpg",
  },
  {
    title: "کودک",
    href: "/atelier/kids",
    image: "/images/slides/sample-2.jpg",
  },
];

const R = 5;

function trianglePath(direction: "up" | "down"): string {
  const apex = direction === "up" ? { x: 50, y: 0 } : { x: 50, y: 100 };
  const left = direction === "up" ? { x: 0, y: 100 } : { x: 0, y: 0 };
  const right = direction === "up" ? { x: 100, y: 100 } : { x: 100, y: 0 };

  const pts = [apex, right, left];
  const n = pts.length;

  function pointToward(
    from: { x: number; y: number },
    to: { x: number; y: number },
    dist: number
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    const t = Math.min(dist / len, 0.49);
    return { x: from.x + dx * t, y: from.y + dy * t };
  }

  let d = "";
  for (let i = 0; i < n; i++) {
    const curr = pts[i];
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    const inPoint = pointToward(curr, prev, R);
    const outPoint = pointToward(curr, next, R);
    d +=
      i === 0
        ? `M ${inPoint.x} ${inPoint.y} `
        : `L ${inPoint.x} ${inPoint.y} `;
    d += `Q ${curr.x} ${curr.y} ${outPoint.x} ${outPoint.y} `;
  }
  return d + "Z";
}

const UP_PATH = trianglePath("up");
const DOWN_PATH = trianglePath("down");

function threadHeight(direction: "up" | "down"): number {
  return direction === "down" ? 40 : 28;
}

function PendulumLabel({
  title,
  direction,
  index,
}: {
  title: string;
  direction: "up" | "down";
  index: number;
}) {
  const controls = useAnimationControls();
  const thread = threadHeight(direction);

  useEffect(() => {
    controls.start({
      rotate: [0, 9, -9, 7, -7, 5, -5, 3, -3, 1, -1, 0],
      transition: {
        duration: 4,
        delay: index * 0.22,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3.5,
      },
    });
  }, [controls, index]);

  return (
    <motion.div
      animate={controls}
      style={{
        transformOrigin: "50% 0%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span
        className="block w-px bg-cyan-700/60"
        style={{ height: `${thread}px` }}
        aria-hidden="true"
      />
      <h3
        className="whitespace-nowrap rounded-sm border border-cyan-700/30 bg-[#f5f2ec] px-3 py-1 text-lg text-cyan-700 shadow-sm"
        style={{ direction: "rtl" }}
      >
        {title}
      </h3>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] py-16 lg:py-24">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath
            id="cat-triangle-up"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.01 0.01)"
          >
            <path d={UP_PATH} />
          </clipPath>
          <clipPath
            id="cat-triangle-down"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.01 0.01)"
          >
            <path d={DOWN_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-right"
        >
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
            <span className="h-px w-8 bg-[var(--primary)]" />
            EXPLORE OUR WORK
          </span>
          <h2 className="mt-4 whitespace-nowrap text-2xl font-light text-black sm:text-4xl lg:text-6xl">
            لحظه‌ای که{" "}
            <span className="font-medium">شما را روایت می‌کند.</span>
          </h2>
        </motion.div>

        <div
          className="relative mx-auto flex w-full overflow-visible"
          style={{ direction: "ltr", gap: 0 }}
        >
          {categories.map((category, index) => {
            const direction: "up" | "down" = index % 2 === 0 ? "up" : "down";

            return (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: direction === "up" ? 80 : -80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex-1"
                style={{
                  marginInlineEnd: index < categories.length - 1 ? "-12%" : 0,
                }}
              >
                <Link href={category.href} className="group block">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "0.85 / 1" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: `url(#cat-triangle-${direction})`,
                      }}
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 24vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
                      <div className="absolute inset-0 bg-[var(--primary)]/0 transition-all duration-500 group-hover:bg-[var(--primary)]/40" />
                    </div>
                  </div>

                  <div
                    className="flex justify-center"
                    style={{
                      marginTop: direction === "down" ? "-9px" : "-2px",
                    }}
                  >
                    <PendulumLabel
                      title={category.title}
                      direction={direction}
                      index={index}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
