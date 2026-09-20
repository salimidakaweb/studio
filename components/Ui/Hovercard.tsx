"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type HoverCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Small hover "lift" wrapper for cards (contact info blocks, etc.).
 * Client-only because of the motion hover — the content passed as
 * `children` is still rendered on the server via the parent Server
 * Component, so nothing here affects SEO/indexability.
 */
export default function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "var(--shadow-primary)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}