"use client";

import { motion } from "motion/react";
import Link from "next/link";

const posts = [
  {
    title: "چطور برای عکاسی عروسی آماده شویم؟",
    category: "راهنمای عکاسی",
    date: "۱۲ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "چرا نور مهم‌ترین عنصر در یک عکس حرفه‌ای است؟",
    category: "آموزش",
    date: "۰۵ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "انتخاب لوکیشن مناسب برای عکاسی فرمالیته",
    category: "ایده و الهام",
    date: "۲۸ مرداد ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="overflow-hidden bg-[#f5f2ec] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-right">
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
              <span className="h-px w-8 bg-[var(--primary)]" />
              JOURNAL
            </span>

            <h2 className="mt-4 text-4xl font-light leading-tight text-[#171512] sm:text-5xl lg:text-6xl">
              از دنیای
              <br />
              <span className="font-medium">آتلیه بختیاری.</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="group flex items-center justify-end gap-3 text-sm text-black/60 transition-colors duration-300 hover:text-[var(--primary-dark)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-2">
              ←
            </span>
            مشاهده همه مقالات
          </Link>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            href="/blog/wedding-photography-guide"
            className="group relative grid overflow-hidden bg-[#171512] lg:grid-cols-[1.25fr_0.75fr]"
          >
            {/* Image */}
            <div className="relative h-[360px] overflow-hidden lg:h-[520px]">
              <motion.img
                src={posts[0].image}
                alt={posts[0].title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.9 }}
              />

              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/30" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-7 text-right text-white sm:p-10 lg:p-12">
              <div className="flex items-start justify-between">
                <span className="text-[10px] tracking-[0.3em] text-white/40">
                  FEATURED
                </span>

                <span className="text-xs text-white/40">
                  {posts[0].date}
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-[var(--primary-light)]">
                  {posts[0].category}
                </span>

                <h3 className="mt-4 text-3xl font-light leading-[1.35] sm:text-4xl">
                  {posts[0].title}
                </h3>

                <div className="mt-8 flex items-center justify-end gap-4 text-sm transition-colors duration-300 group-hover:text-[var(--primary-light)]">
                  <span>خواندن مقاله</span>

                  <span className="transition-transform duration-300 group-hover:-translate-x-2">
                    ←
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other Posts */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {posts.slice(1).map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
            >
              <Link
                href="/blog"
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                </div>

                {/* Meta */}
                <div className="mt-5 flex items-center justify-between border-b border-black/10 pb-4">
                  <span className="text-[10px] text-black/35">
                    {post.date}
                  </span>

                  <span className="text-[10px] tracking-[0.2em] text-[var(--primary-dark)]">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-5 flex items-start justify-between gap-5">
                  <span className="text-xl text-black/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[var(--primary)]">
                    ←
                  </span>

                  <h3 className="text-right text-xl font-medium leading-8 text-[#171512]">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}