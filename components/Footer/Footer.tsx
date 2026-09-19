"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";

const footerLinks = [
  { title: "خانه", href: "/" },
  { title: "خدمات", href: "/#services" },
  { title: "نمونه‌کارها", href: "/#portfolio" },
  { title: "وبلاگ", href: "/blog" },
  { title: "درباره ما", href: "/about" },
];

function MagneticText({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 150,
    damping: 12,
  });

  const springY = useSpring(y, {
    stiffness: 150,
    damping: 12,
  });

  const rotate = useTransform(springX, [-30, 30], [-3, 3]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotate,
      }}
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

export default function Footer() {
  return (
    <footer className="relative flex h-[680px] flex-col overflow-hidden bg-[#0d0c0a] text-white">

      {/* Ambient Light */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "var(--primary)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.24, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CTA */}
      <section className="relative border-b border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-right"
          >
            <div>
              <span className="text-[10px] tracking-[0.4em] text-[var(--primary-light)]">
                LET'S CREATE SOMETHING BEAUTIFUL
              </span>

              <h2 className="mt-3 text-3xl font-light leading-[1.2] sm:text-4xl lg:text-5xl">
                داستان شما،
                <span className="font-medium"> قاب ما.</span>
              </h2>
            </div>

            <MagneticText>
              <Link
                href="/booking"
                className="btn-primary group relative flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium text-white"
                style={{ willChange: "transform" }}
              >
                <span className="relative z-10">رزرو وقت</span>

                <motion.span
                  className="relative z-10 text-base"
                  initial={{ x: 0 }}
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  ←
                </motion.span>
              </Link>
            </MagneticText>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="relative flex-1 py-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-right"
            >
              <Link
                href="/"
                className="inline-block text-xl font-medium tracking-tight"
              >
                آتلیه{" "}
                <span className="text-[var(--primary-light)]">
                  بختیاری
                </span>
              </Link>

              <p className="mt-3 max-w-sm mr-auto text-[13px] leading-6 text-white/40">
                روایت لحظه‌های خاص شما، با نگاهی متفاوت و ماندگار.
              </p>

              {/* Social */}
              <div className="mt-5 flex justify-end gap-2">
                {["Instagram", "Telegram", "WhatsApp"].map(
                  (social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-full border border-white/10 px-3 py-2 text-[9px] tracking-[0.1em] text-white/45 transition-colors duration-300 hover:border-[var(--primary)]/50 hover:text-[var(--primary-light)]"
                    >
                      {social}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="text-right"
            >
              <span className="text-[9px] tracking-[0.3em] text-white/25">
                NAVIGATION
              </span>

              <div className="mt-4 space-y-2.5">
                {footerLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex items-center justify-end gap-2 text-[13px] text-white/50 transition-colors duration-300 hover:text-[var(--primary-light)]"
                  >
                    <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      ←
                    </span>

                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="text-right"
            >
              <span className="text-[9px] tracking-[0.3em] text-white/25">
                CONTACT
              </span>

              <div className="mt-4 space-y-2.5 text-[13px] text-white/50">
                <a
                  href="tel:+989121234567"
                  className="block transition-colors hover:text-[var(--primary-light)]"
                >
                  ۰۹۱۲ ۱۲۳ ۴۵۶۷
                </a>

                <a
                  href="mailto:hello@atelier-bakhtiari.ir"
                  className="block transition-colors hover:text-[var(--primary-light)]"
                >
                  hello@atelier-bakhtiari.ir
                </a>

                <p className="leading-6">
                  تهران، ایران
                  <br />
                  با تعیین وقت قبلی
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Giant Brand */}
      <section className="relative overflow-hidden border-t border-white/10 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="whitespace-nowrap text-center"
        >
          <motion.div
            animate={{
              x: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[12vw] font-medium leading-none tracking-[-0.06em] text-white sm:text-[10vw]"
          >
            BAKHTIARI
          </motion.div>
        </motion.div>
      </section>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>
            © 2026 ATELIER BAKHTIARI
          </span>

          <span>
            ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}