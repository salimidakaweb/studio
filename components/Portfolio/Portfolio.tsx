"use client";

import { motion } from "motion/react";
import Link from "next/link";

const portfolioItems = [
  {
    title: "عروسی",
    category: "WEDDING",
    image: "/images/slides/sample-1.jpg",
    className: "md:row-span-2",
  },
  {
    title: "پرتره",
    category: "PORTRAIT",
    image: "/images/slides/sample-2.jpg",
    className: "",
  },
  {
    title: "عقد",
    category: "CEREMONY",
    image: "/images/slides/sample-3.jpg",
    className: "",
  },
  {
    title: "کودک",
    category: "KIDS",
    image: "/images/slides/sample-2.jpg",
    className: "md:col-span-2",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="flex h-[670px] items-center overflow-hidden bg-[#171512] text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-right">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-light)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              SELECTED WORKS
            </span>

            <h2 className="mt-2 text-2xl font-light leading-tight sm:text-3xl lg:text-4xl">
              بعضی لحظه‌ها،
              <span className="font-medium"> دیدنی‌ترند.</span>
            </h2>
          </div>

          <p className="max-w-xs text-right text-xs leading-6 text-white/50">
            مجموعه‌ای از لحظه‌هایی که با دوربین ما ثبت شده‌اند.
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="grid auto-rows-[110px] grid-cols-2 gap-3 sm:auto-rows-[140px] md:grid-cols-4 md:auto-rows-[150px]">

          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className={item.className}
            >
              <Link
                href={`/portfolio/${item.category.toLowerCase()}`}
                className="group relative block h-full overflow-hidden rounded-sm"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-500 group-hover:from-[var(--primary-dark)]/70" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 lg:p-4">
                  <div className="flex justify-between">
                    <span className="text-[9px] tracking-[0.25em] text-white/70">
                      {item.category}
                    </span>

                    <span className="text-xs text-white/70 transition-transform duration-300 group-hover:-translate-x-1">
                      ↙
                    </span>
                  </div>

                  <div className="translate-y-2 text-right opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-base font-medium text-white sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <Link
            href="/portfolio"
            className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs text-white transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-light)]"
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