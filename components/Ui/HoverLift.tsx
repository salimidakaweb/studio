"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type HoverLiftProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** Small link with a hover "lift". Client-only because of the motion hover. */
export default function HoverLift({
  href,
  children,
  className,
  external = false,
  ariaLabel,
}: HoverLiftProps) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}