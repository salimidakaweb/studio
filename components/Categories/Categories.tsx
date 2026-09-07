"use client";

import { motion } from "motion/react";
import Link from "next/link";

const categories = [
  { title: "عروسی", english: "WEDDING", href: "/portfolio/wedding" },
  { title: "عقد", english: "CEREMONY", href: "/portfolio/ceremony" },
  { title: "فرمالیته", english: "FORMALITY", href: "/portfolio/formality" },
  { title: "پرتره", english: "PORTRAIT", href: "/portfolio/portrait" },
  { title: "کودک", english: "KIDS", href: "/atelier/kids" },
  { title: "اسپرت", english: "CASUAL", href: "/portfolio/casual" },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-right"
        >
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
            <span className="h-px w-8 bg-[var(--primary)]" />
            EXPLORE OUR WORK
          </span>

          <h2 className="mt-4 text-4xl font-light text-black sm:text-5xl lg:text-6xl">
            لحظه‌ای که
            <br />
            <span className="font-medium">شما را روایت می‌کند.</span>
          </h2>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
            >
              <Link href={category.href} className="group block text-center">
                {/* Circle */}
                <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-full border border-black/10 shadow-[0_0_0_0_rgba(var(--primary-rgb),0)] transition-shadow duration-500 group-hover:border-[var(--primary)]/40 group-hover:shadow-[0_18px_45px_-15px_rgba(var(--primary-rgb),0.45)]">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-[#ddd7cc] transition-transform duration-700 group-hover:scale-110" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[var(--primary)]/0 transition-all duration-500 group-hover:bg-[var(--primary)]/75" />

                  {/* Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-black transition-all duration-500 group-hover:text-white">
                    <span className="text-2xl font-medium">
                      {category.title}
                    </span>

                    <span className="mt-2 text-[9px] tracking-[0.3em] opacity-60">
                      {category.english}
                    </span>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="mx-auto mt-5 h-px w-0 bg-[var(--primary)] transition-all duration-500 group-hover:w-10" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
