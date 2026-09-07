"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";

const plans = [
  {
    name: "Essential",
    title: "پکیج پایه",
    description: "برای ثبت ساده و زیبا از لحظه‌های خاص شما.",
    price: "۵",
    features: [
      "۲ ساعت عکاسی",
      "۱ عکاس",
      "۲۰ عکس ادیت‌شده",
      "تحویل دیجیتال",
    ],
  },
  {
    name: "Signature",
    title: "پکیج ویژه",
    description: "انتخابی کامل برای کسانی که جزئیات برایشان مهم است.",
    price: "۱۰",
    featured: true,
    features: [
      "۴ ساعت عکاسی",
      "۲ عکاس",
      "۵۰ عکس ادیت‌شده",
      "آلبوم اختصاصی",
      "تحویل دیجیتال",
    ],
  },
  {
    name: "Premium",
    title: "پکیج کامل",
    description: "یک تجربه کامل برای ثبت تمام لحظه‌های مهم شما.",
    price: "۱۸",
    features: [
      "پوشش کامل مراسم",
      "۲ عکاس + فیلمبردار",
      "۸۰ عکس ادیت‌شده",
      "آلبوم لوکس",
      "فیلم سینمایی",
    ],
  },
];

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof plans)[number];
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 150,
    damping: 15,
  });

  const springY = useSpring(mouseY, {
    stiffness: 150,
    damping: 15,
  });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

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
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.92,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      {/* Glow */}
      <motion.div
        className={`absolute -inset-px rounded-sm opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100 ${
          plan.featured ? "bg-[var(--primary)]/30" : "bg-white/20"
        }`}
      />

      <div
        className={`relative flex h-full min-h-[620px] flex-col overflow-hidden border p-7 transition-all duration-700 lg:p-9 ${
          plan.featured
            ? "border-[var(--primary-light)]/40 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-dark)] text-white shadow-[0_30px_70px_-20px_rgba(var(--primary-rgb),0.55)]"
            : "border-white/10 bg-white/[0.02] text-white backdrop-blur-sm"
        }`}
      >
        {/* Mouse Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 55%)",
            x: useTransform(springX, [-0.5, 0.5], [-120, 120]),
            y: useTransform(springY, [-0.5, 0.5], [-120, 120]),
          }}
        />

        {/* Decorative Number */}
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.15 + 0.4,
            duration: 0.6,
          }}
          className={`absolute -bottom-8 -left-3 text-[150px] font-light leading-none transition-transform duration-1000 group-hover:-translate-y-5 ${
            plan.featured
              ? "text-white/10"
              : "text-white/[0.025]"
          }`}
        >
          0{index + 1}
        </motion.span>

        {/* Top */}
        <div className="relative z-10 flex items-start justify-between">
          <span
            className={`text-[10px] tracking-[0.35em] ${
              plan.featured
                ? "text-white/60"
                : "text-white/30"
            }`}
          >
            {plan.name}
          </span>

          {plan.featured && (
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="rounded-full bg-white/15 px-3 py-1 text-[9px] tracking-[0.3em] text-white"
            >
              RECOMMENDED
            </motion.span>
          )}
        </div>

        {/* Title */}
        <div className="relative z-10 mt-16 text-right">
          <motion.h3
            className="text-3xl font-medium lg:text-4xl"
            whileHover={{ x: -6 }}
            transition={{ duration: 0.3 }}
          >
            {plan.title}
          </motion.h3>

          <p
            className={`mt-4 max-w-sm mr-auto text-sm leading-7 ${
              plan.featured
                ? "text-white/75"
                : "text-white/45"
            }`}
          >
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div
          className={`relative z-10 mt-12 border-t pt-7 ${
            plan.featured
              ? "border-white/20"
              : "border-white/10"
          }`}
        >
          <span
            className={`text-xs ${
              plan.featured
                ? "text-white/60"
                : "text-white/30"
            }`}
          >
            شروع قیمت
          </span>

          <div className="mt-2 flex items-baseline justify-end gap-2">
            <span className="text-5xl font-light tracking-tight">
              {plan.price}
            </span>

            <span
              className={`text-xs ${
                plan.featured
                  ? "text-white/60"
                  : "text-white/30"
              }`}
            >
              میلیون تومان
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="relative z-10 mt-10 flex-1 space-y-4">
          {plan.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay:
                  index * 0.15 +
                  featureIndex * 0.08 +
                  0.5,
              }}
              className={`flex items-center justify-end gap-3 text-sm ${
                plan.featured
                  ? "text-white/85"
                  : "text-white/60"
              }`}
            >
              <span>{feature}</span>

              <span
                className={`h-1 w-1 rounded-full transition-transform duration-300 group-hover:scale-150 ${
                  plan.featured
                    ? "bg-white/70"
                    : "bg-white/40"
                }`}
              />
            </motion.li>
          ))}
        </ul>

        {/* Button */}
        <Link
          href="/booking"
          className={`group/button relative z-10 mt-10 flex items-center justify-center gap-4 overflow-hidden rounded-full border py-4 text-sm font-medium transition-all duration-500 ${
            plan.featured
              ? "border-white/40 bg-white text-[var(--primary-dark)] shadow-[0_15px_35px_-12px_rgba(0,0,0,0.35)]"
              : "border-white/20 text-white"
          }`}
        >
          {!plan.featured && (
            <span className="absolute inset-0 origin-right scale-x-0 bg-[var(--primary)] transition-transform duration-500 group-hover/button:scale-x-100" />
          )}

          <span
            className={`relative z-10 transition-colors duration-500 ${
              plan.featured ? "" : "group-hover/button:text-white"
            }`}
          >
            انتخاب این پکیج
          </span>

          <span
            className={`relative z-10 transition-all duration-500 group-hover/button:-translate-x-2 ${
              plan.featured ? "" : "group-hover/button:text-white"
            }`}
          >
            ←
          </span>
        </Link>

        {/* Bottom line */}
        <motion.div
          className={`absolute bottom-0 right-0 h-[2px] w-full origin-right ${
            plan.featured
              ? "bg-white/30"
              : "bg-white/30"
          }`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: index * 0.15 + 0.8,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Plans() {
  return (
    <section
      id="plans"
      className="relative overflow-hidden bg-[#171512] py-24 text-white lg:py-32"
    >
      {/* Ambient Light */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "var(--primary)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16 text-right"
        >
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-light)]">
            <span className="h-px w-8 bg-[var(--primary)]" />
            PACKAGES
          </span>

          <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            برای هر لحظه،
            <br />
            <span className="font-medium">
              یک انتخاب.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              index={index}
            />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="mt-8 text-right text-xs leading-6 text-white/25"
        >
          * قیمت‌ها نمونه هستند و با توجه به نوع مراسم و خدمات
          انتخابی قابل تغییر خواهند بود.
        </motion.p>
      </div>
    </section>
  );
}