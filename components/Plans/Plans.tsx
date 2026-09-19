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
        className={`relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-sm border p-5 transition-all duration-700 lg:p-6 ${
          plan.featured
            ? "border-[var(--primary-dark)]/30 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-dark)] text-white shadow-[0_20px_45px_-18px_rgba(var(--primary-rgb),0.5)]"
            : "border-black/10 bg-white text-[#171512] shadow-[0_10px_30px_-18px_rgba(20,18,15,0.25)]"
        }`}
      >
        {/* Mouse Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: plan.featured
              ? "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 55%)"
              : "radial-gradient(circle, rgba(20,18,15,0.05) 0%, transparent 55%)",
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
          className={`absolute -bottom-5 -left-2 text-[90px] font-light leading-none transition-transform duration-1000 group-hover:-translate-y-3 ${
            plan.featured ? "text-white/10" : "text-black/[0.04]"
          }`}
        >
          0{index + 1}
        </motion.span>

        {/* Top */}
        <div className="relative z-10 flex items-start justify-between">
          <span
            className={`text-[10px] tracking-[0.3em] ${
              plan.featured ? "text-white/60" : "text-black/35"
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
              className="rounded-full bg-white/15 px-2.5 py-1 text-[8px] tracking-[0.25em] text-white"
            >
              RECOMMENDED
            </motion.span>
          )}
        </div>

        {/* Title */}
        <div className="relative z-10 mt-8 text-right">
          <motion.h3
            className="text-xl font-medium lg:text-2xl"
            whileHover={{ x: -6 }}
            transition={{ duration: 0.3 }}
          >
            {plan.title}
          </motion.h3>

          <p
            className={`mt-2 max-w-sm mr-auto text-xs leading-6 ${
              plan.featured ? "text-white/75" : "text-black/50"
            }`}
          >
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div
          className={`relative z-10 mt-6 border-t pt-4 ${
            plan.featured ? "border-white/20" : "border-black/10"
          }`}
        >
          <span
            className={`text-[11px] ${
              plan.featured ? "text-white/60" : "text-black/35"
            }`}
          >
            شروع قیمت
          </span>

          <div className="mt-1 flex items-baseline justify-end gap-2">
            <span className="text-3xl font-light tracking-tight">
              {plan.price}
            </span>

            <span
              className={`text-[11px] ${
                plan.featured ? "text-white/60" : "text-black/35"
              }`}
            >
              میلیون تومان
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="relative z-10 mt-5 flex-1 space-y-2.5">
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
              className={`flex items-center justify-end gap-2.5 text-[13px] ${
                plan.featured ? "text-white/85" : "text-black/65"
              }`}
            >
              <span>{feature}</span>

              <span
                className={`h-1 w-1 rounded-full transition-transform duration-300 group-hover:scale-150 ${
                  plan.featured ? "bg-white/70" : "bg-[var(--primary)]/60"
                }`}
              />
            </motion.li>
          ))}
        </ul>

        {/* Button */}
        <Link
          href="/booking"
          className={`group/button relative z-10 mt-6 flex items-center justify-center gap-3 overflow-hidden rounded-full border py-3 text-xs font-medium transition-all duration-500 ${
            plan.featured
              ? "border-white/40 bg-white text-[var(--primary-dark)] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.35)]"
              : "border-black/15 text-[#171512]"
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
            plan.featured ? "bg-white/30" : "bg-[var(--primary)]/30"
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
      className="relative flex h-[650px] items-center overflow-hidden bg-[#f5f2ec]"
    >
      {/* Ambient Light */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
        style={{ background: "var(--primary)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-6 text-right"
        >
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            PACKAGES
          </span>

          <h2 className="mt-2 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
            برای هر لحظه،
            <span className="font-medium"> یک انتخاب.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 lg:grid-cols-3">
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
          className="mt-4 text-right text-[11px] leading-6 text-black/35"
        >
          * قیمت‌ها نمونه هستند و با توجه به نوع مراسم و خدمات
          انتخابی قابل تغییر خواهند بود.
        </motion.p>
      </div>
    </section>
  );
}