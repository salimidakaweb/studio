"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Client-only leaf: the floating camera that drifts toward the cursor, with a
// slideshow on its LCD screen. It contains no headings or copy (nothing for SEO).

// Photos shown one-by-one on the camera's LCD screen, as if the photographer
// is reviewing shots they just took. They come in as a prop (per page), with
// their own alt text, so kids/wedding each show their own work.
type Slide = { image: string; alt: string };

// LCD screen position as a percentage of the camera image (1400x1000 source).
// Measured directly from the provided photo.
const SCREEN = {
  left: 14,
  top: 43,
  width: 55,
  height: 52,
};

const SLIDE_DURATION = 4500;

export default function HeroCamera({ slides }: { slides: Slide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [slides.length]);

  // Mouse position (raw, -0.5..0.5) relative to the camera wrapper
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed / springy version so the camera drifts/floats toward the cursor
  const springConfig = { stiffness: 55, damping: 16, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Camera drifts toward the mouse + a subtle 3D tilt
  const cameraX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const cameraY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const cameraRotateX = useTransform(springY, [-0.5, 0.5], [9, -9]);
  const cameraRotateY = useTransform(springX, [-0.5, 0.5], [-11, 11]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Start the entrance (camera + text together) only once the camera image is
  // actually loaded, so the text never shows up alone. Both use CSS animations
  // that stay paused until <section data-hero-ready="true">. A timeout makes
  // sure a slow/failed image can never keep the hero hidden.
  useEffect(() => {
    const el = wrapperRef.current;
    const section = el?.closest("section");
    const img = el?.querySelector("img");
    if (!el || !section) return;

    let done = false;
    const ready = () => {
      if (done) return;
      done = true;
      section.setAttribute("data-hero-ready", "true");
    };

    const timeout = window.setTimeout(ready, 2500);

    if (img && img.complete && img.naturalWidth > 0) {
      // decode() so the first painted frame already has the image
      img.decode().catch(() => {}).finally(ready);
    } else if (img) {
      img.addEventListener("load", ready, { once: true });
      img.addEventListener("error", ready, { once: true });
    } else {
      ready();
    }

    return () => {
      window.clearTimeout(timeout);
      img?.removeEventListener("load", ready);
      img?.removeEventListener("error", ready);
    };
  }, []);

  // The hero <section> is a server component now, so instead of an onMouseMove
  // prop on it we listen on the closest <section> from here. Same behaviour as
  // before: the whole hero area drives the camera.
  useEffect(() => {
    const el = wrapperRef.current;
    const section = el?.closest("section");
    if (!el || !section) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={wrapperRef}
      className="hero-camera-in relative w-[92vw] max-w-[820px] shrink-0 [perspective:1400px] sm:w-[80vw] md:w-[68vw] lg:w-[54vw] xl:max-w-[1700px]"
    >
      {/* Continuous gentle float (up/down), independent of the mouse-follow layer */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Mouse-follow drift + 3D tilt */}
        <motion.div
          className="relative"
          style={{
            x: cameraX,
            y: cameraY,
            rotateX: cameraRotateX,
            rotateY: cameraRotateY,
          }}
        >
          {/* Camera body */}
          <Image
            src="/images/camera.png"
            alt="دوربین عکاسی آتلیه بختیاری"
            width={1400}
            height={1000}
            sizes="(max-width: 1024px) 92vw, 54vw"
            priority
            className="relative z-10 w-full select-none"
            draggable={false}
          />

          {/* Slider sits exactly inside the camera's LCD screen */}
          <div
            className="absolute z-20 overflow-hidden bg-black"
            style={{
              left: `${SCREEN.left}%`,
              top: `${SCREEN.top}%`,
              width: `${SCREEN.width}%`,
              height: `${SCREEN.height}%`,
            }}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slides[activeIndex].image}
                  alt={slides[activeIndex].alt}
                  fill
                  sizes="(max-width: 768px) 60vw, 34vw"
                  priority
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* subtle screen sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}