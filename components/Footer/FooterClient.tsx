"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";

/** Magnetic hover effect around the CTA button. Only the effect is client-side. */
export function MagneticText({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });
  const rotate = useTransform(springX, [-30, 30], [-3, 3]);

  return (
    <motion.div
      style={{ x: springX, y: springY, rotate }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Slow pulsing background glow. Purely decorative. */
export function AmbientGlow() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
      style={{ background: "var(--primary)" }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.24, 0.12] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Big drifting brand word at the bottom of the footer. */
export function GiantBrand({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="whitespace-nowrap text-center"
    >
      <motion.div
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="text-[12vw] font-medium leading-none tracking-[-0.06em] text-white sm:text-[10vw]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}