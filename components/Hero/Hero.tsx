"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Photos shown one-by-one on the camera's LCD screen, as if the photographer
// is reviewing shots they just took.
// Replace these with your own studio photos in /public/images/slides/
const SLIDES = [
  "/images/slides/sample-1.jpg",
  "/images/slides/sample-2.jpg",
  "/images/slides/sample-3.jpg",
];

// LCD screen position as a percentage of the camera image (1400x1000 source).
// Measured directly from the provided photo.
const SCREEN = {
  left: 14,
  top: 43,
  width: 55,
  height: 52,
};

const SLIDE_DURATION = 4500;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div>
      <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 45%, #1B2A33 0%, #0F1B22 45%, #0A1318 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft ambient glow behind the camera */}
      <motion.div
        className="pointer-events-none absolute h-[700px] w-[700px] rounded-full opacity-30 blur-[150px] lg:right-[58%]"
        style={{ background: "var(--primary)" }}
        animate={{ opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fine vignette to keep the corners calm and let the camera read clearly */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 42%, transparent 40%, rgba(6,10,13,0.55) 100%)",
        }}
      />

      {/* Two-column layout: camera on the physical left, free content column on the physical right */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col-reverse items-center gap-10 px-6 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-4 lg:px-16">
        {/* Camera, floating + drifting toward the mouse */}
        <motion.div
          ref={wrapperRef}
          className="relative w-[92vw] max-w-[820px] shrink-0 [perspective:1400px] sm:w-[80vw] md:w-[68vw] lg:w-[54vw] xl:max-w-[1700px]"
          initial={{ opacity: 0, scale: 0.82, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
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
                alt="دوربین"
                width={1400}
                height={1000}
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
                      src={SLIDES[activeIndex]}
                      alt="نمونه کار"
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
        </motion.div>

        {/* Free content column — put your title, subtitle, and buttons here */}
        <motion.div
          className="w-full max-w-xl text-center lg:text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm tracking-[0.3em] text-[var(--primary)]">
            آتلیه بختیاری
          </span>

          <h1 className="mt-4 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
            لحظه‌های کودکی،
            <br />
            برای همیشه ثبت می‌شوند
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            عکاسی تخصصی کودک و نوزاد، با نور استودیویی و فضایی امن و آرام؛
            خاطره‌ای که سال‌ها بعد هم لبخند به لب می‌آورد.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-end">
            <button className="rounded-full bg-[var(--primary)] px-8 py-3 font-medium text-white transition hover:opacity-90">
              رزرو نوبت عکاسی
            </button>
            <button className="rounded-full border border-white/25 px-8 py-3 font-medium text-white transition hover:bg-white/10">
              مشاهده نمونه‌کارها
            </button>
          </div>
        </motion.div>
      </div>
    </section>
    </div>
  );
}