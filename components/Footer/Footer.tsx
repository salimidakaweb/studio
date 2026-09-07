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
    <footer className="relative overflow-hidden bg-[#0d0c0a] text-white">

      {/* Ambient Light */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "var(--primary)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.32, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CTA */}
      <section className="relative border-b border-white/10 py-28 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-center"
          >
            <span className="text-[10px] tracking-[0.5em] text-[var(--primary-light)]">
              LET'S CREATE SOMETHING BEAUTIFUL
            </span>

            <h2 className="mt-8 text-5xl font-light leading-[1.1] sm:text-7xl lg:text-[110px]">
              داستان شما،
              <br />
              <span className="font-medium">
                قاب ما.
              </span>
            </h2>

            <div className="mt-12 flex justify-center">
              <MagneticText>
                <Link
                  href="/booking"
                  className="group relative flex h-32 w-32 items-center justify-center rounded-full border border-[var(--primary-light)]/40 text-sm transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_50px_-12px_rgba(var(--primary-rgb),0.6)] sm:h-40 sm:w-40"
                  style={{ willChange: "transform" }}
                >
                  <span
                    className="absolute inset-0 scale-0 rounded-full opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary-light), var(--primary), var(--primary-dark))",
                    }}
                  />

                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                    رزرو وقت
                  </span>

                  <motion.span
                    className="absolute text-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-white"
                    initial={{ x: 0 }}
                    whileHover={{ x: -5 }}
                  >
                    ←
                  </motion.span>
                </Link>
              </MagneticText>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="relative py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">

          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-right"
            >
              <Link
                href="/"
                className="inline-block text-3xl font-medium tracking-tight"
              >
                آتلیه{" "}
                <span className="text-white/40">
                  بختیاری
                </span>
              </Link>

              <p className="mt-6 max-w-sm mr-auto text-sm leading-8 text-white/35">
                روایت لحظه‌های خاص شما،
                با نگاهی متفاوت و ماندگار.
              </p>

              {/* Social */}
              <div className="mt-8 flex justify-end gap-3">
                {["Instagram", "Telegram", "WhatsApp"].map(
                  (social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{
                        y: -5,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="border border-white/10 px-4 py-3 text-[10px] tracking-[0.15em] text-white/40 transition-colors duration-300 hover:border-white/40 hover:text-white"
                    >
                      {social}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="text-right"
            >
              <span className="text-[10px] tracking-[0.35em] text-white/25">
                NAVIGATION
              </span>

              <div className="mt-7 space-y-4">
                {footerLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex items-center justify-end gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-[var(--primary-light)]"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="text-right"
            >
              <span className="text-[10px] tracking-[0.35em] text-white/25">
                CONTACT
              </span>

              <div className="mt-7 space-y-5 text-sm text-white/50">
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

                <p className="leading-7">
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
      <section className="relative overflow-hidden border-t border-white/10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="whitespace-nowrap text-center"
        >
          <motion.div
            animate={{
              x: [0, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[15vw] font-medium leading-none tracking-[-0.06em] text-white/[0.035]"
          >
            BAKHTIARI
          </motion.div>
        </motion.div>
      </section>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-[10px] text-white/25 sm:flex-row sm:items-center sm:justify-between lg:px-12">
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