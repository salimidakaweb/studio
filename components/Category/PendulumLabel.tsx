"use client";

import { motion } from "motion/react";

// Client-only leaf: the swinging label. The title text is passed in from the
// server component, so the <h3> is still part of the server-rendered HTML.

function threadHeight(direction: "up" | "down"): number {
  return direction === "down" ? 40 : 28;
}

export default function PendulumLabel({
  title,
  direction,
  index,
}: {
  title: string;
  direction: "up" | "down";
  index: number;
}) {
  const thread = threadHeight(direction);

  return (
    <motion.div
      animate={{ rotate: [0, 9, -9, 7, -7, 5, -5, 3, -3, 1, -1, 0] }}
      transition={{
        duration: 4,
        delay: index * 0.22,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3.5,
      }}
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
        className="w-[16vw] rounded-sm border border-cyan-700/30 bg-[#f5f2ec] px-1 py-0.5 text-center text-[9px] leading-tight text-cyan-700 shadow-sm sm:w-auto sm:whitespace-nowrap sm:px-3 sm:py-1 sm:text-lg"
        style={{ direction: "rtl" }}
      >
        {title}
      </h3>
    </motion.div>
  );
}