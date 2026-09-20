"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Initial vertical offset in px (positive = starts lower). */
  y?: number;
  /** Initial horizontal offset in px. */
  x?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper.
 *
 * This is the ONLY client-side piece: the page content passed as `children`
 * is rendered on the server, so headings and paragraphs are present in the
 * initial HTML that search engines index. Animation is layered on top.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}