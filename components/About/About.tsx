"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f5f2ec] py-24 lg:py-32"
    >
      {/* Subtle brand-tinted ambient accent */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: "var(--primary)" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_60px_-20px_rgba(20,18,15,0.35)]">
            <motion.img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop"
              alt="آتلیه بختیاری"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7 }}
            />

            <div className="absolute inset-0 bg-black/10" />

            {/* Brand-color frame accent */}
            <div className="pointer-events-none absolute inset-3 border border-[var(--primary-light)]/0 transition-colors duration-700" />
          </div>

          {/* Decorative frame offset in brand color */}
          <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-full w-full border border-[var(--primary)]/25" />

          {/* Decorative Number */}
          <div className="absolute -bottom-8 -right-5 text-[100px] font-light leading-none text-black/5 sm:-right-10 sm:text-[140px]">
            15
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-right"
        >
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
            <span className="h-px w-8 bg-[var(--primary)]" />
            ABOUT ATELIER
          </span>

          <h2 className="mt-5 text-4xl font-light leading-[1.2] text-[#171512] sm:text-5xl lg:text-6xl">
            ما فقط عکس
            <br />
            <span className="font-medium">ثبت نمی‌کنیم.</span>
          </h2>

          <div className="mt-8 max-w-xl mr-auto space-y-5 text-sm leading-8 text-black/60 sm:text-base">
            <p>
              در آتلیه بختیاری، هر تصویر شروع یک داستان است؛
              داستانی از آدم‌ها، احساسات و لحظه‌هایی که قرار نیست
              دوباره تکرار شوند.
            </p>

            <p>
              ما تلاش می‌کنیم با ترکیب تجربه، خلاقیت و نگاه هنری،
              تصاویری خلق کنیم که سال‌ها بعد هم همان حس روز اول
              را برای شما زنده کنند.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 flex justify-end gap-12 border-t border-black/10 pt-8">
            <div className="text-right">
              <div className="text-4xl font-light text-[var(--primary-dark)]">
                15+
              </div>

              <div className="mt-2 text-xs text-black/40">سال تجربه</div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-light text-[var(--primary-dark)]">
                2K+
              </div>

              <div className="mt-2 text-xs text-black/40">
                خاطره ثبت‌شده
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-10 flex justify-end">
            <Link
              href="/about"
              className="group flex items-center gap-4 border-b border-[var(--primary)] pb-3 text-sm font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-2">
                ←
              </span>
              بیشتر درباره ما
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
