"use client";

import { motion } from "motion/react";
import Link from "next/link";

const portfolioItems = [
  {
    title: "عروسی",
    category: "WEDDING",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
    className: "md:row-span-2",
  },
  {
    title: "پرتره",
    category: "PORTRAIT",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    className: "",
  },
  {
    title: "عقد",
    category: "CEREMONY",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    className: "",
  },
  {
    title: "کودک",
    category: "KIDS",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    className: "md:col-span-2",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-[#f5f2ec] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-right">
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
              <span className="h-px w-8 bg-[var(--primary)]" />
              SELECTED WORKS
            </span>

            <h2 className="mt-4 text-4xl font-light leading-tight text-[#171512] sm:text-5xl lg:text-6xl">
              بعضی لحظه‌ها،
              <br />
              <span className="font-medium">دیدنی‌ترند.</span>
            </h2>
          </div>

          <p className="max-w-sm text-right text-sm leading-7 text-black/50">
            مجموعه‌ای از لحظه‌هایی که با دوربین ما ثبت شده‌اند؛
            هر کدام یک داستان، یک احساس و یک خاطره.
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:auto-rows-[320px] md:grid-cols-2">

          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className={item.className}
            >
              <Link
                href={`/portfolio/${item.category.toLowerCase()}`}
                className="group relative block h-full overflow-hidden"
              >
                {/* Image */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-all duration-500 group-hover:from-[var(--primary-dark)]/70" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-[0.3em] text-white/70">
                      {item.category}
                    </span>

                    <span className="text-white/70 transition-transform duration-300 group-hover:-translate-x-2">
                      ↙
                    </span>
                  </div>

                  <div className="translate-y-3 text-right opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-3xl font-medium text-white">
                      {item.title}
                    </h3>

                    <span className="mt-2 block text-xs text-white/70">
                      مشاهده مجموعه
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/portfolio"
            className="group flex items-center gap-4 rounded-full border border-black/20 bg-white px-8 py-4 text-sm text-[#171512] shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-dark)] hover:shadow-[0_15px_35px_-15px_rgba(var(--primary-rgb),0.5)]"
          >
            <span>مشاهده تمام نمونه‌کارها</span>

            <span className="transition-transform duration-300 group-hover:-translate-x-2">
              ←
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}