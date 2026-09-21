import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";
import {
  PlanBottomLine,
  PlanCardShell,
  PlanFeature,
  PlanNumber,
  PlansCarousel,
} from "./PlansClient";

// Server component: every title, price and feature is in the initial HTML.
// Client leaves live in PlansClient.tsx (tilt/spotlight shell, carousel, and a
// few small entrance animations). The featured badge pulse and the ambient
// glow are pure CSS.

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
  const featured = Boolean(plan.featured);

  return (
    <PlanCardShell index={index} featured={featured}>
      <PlanNumber index={index} featured={featured} />

      {/* Top */}
      <div className="relative z-10 flex items-start justify-between">
        <span
          className={`text-[10px] tracking-[0.3em] ${
            featured ? "text-white/60" : "text-black/35"
          }`}
        >
          {plan.name}
        </span>

        {featured && (
          <span className="animate-pulse rounded-full bg-white/15 px-2.5 py-1 text-[8px] tracking-[0.25em] text-white">
            RECOMMENDED
          </span>
        )}
      </div>

      {/* Title */}
      <div className="relative z-10 mt-8 text-right">
        <h3 className="text-xl font-medium transition-transform duration-300 hover:-translate-x-1.5 lg:text-2xl">
          {plan.title}
        </h3>

        <p
          className={`mt-2 max-w-sm mr-auto text-xs leading-6 ${
            featured ? "text-white/75" : "text-black/50"
          }`}
        >
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div
        className={`relative z-10 mt-6 border-t pt-4 ${
          featured ? "border-white/20" : "border-black/10"
        }`}
      >
        <span
          className={`text-[11px] ${
            featured ? "text-white/60" : "text-black/35"
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
              featured ? "text-white/60" : "text-black/35"
            }`}
          >
            میلیون تومان
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="relative z-10 mt-5 flex-1 space-y-2.5">
        {plan.features.map((feature, featureIndex) => (
          <PlanFeature
            key={feature}
            index={index}
            featureIndex={featureIndex}
            featured={featured}
          >
            {feature}
          </PlanFeature>
        ))}
      </ul>

      {/* Button */}
      <Link
        href="/booking"
        className={`group/button relative z-10 mt-6 flex items-center justify-center gap-3 overflow-hidden rounded-full border py-3 text-xs font-medium transition-all duration-500 ${
          featured
            ? "border-white/40 bg-white text-[var(--primary-dark)] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.35)]"
            : "border-black/15 text-[#171512]"
        }`}
      >
        {!featured && (
          <span className="absolute inset-0 origin-right scale-x-0 bg-[var(--primary)] transition-transform duration-500 group-hover/button:scale-x-100" />
        )}

        <span
          className={`relative z-10 transition-colors duration-500 ${
            featured ? "" : "group-hover/button:text-white"
          }`}
        >
          انتخاب این پکیج
        </span>

        <span
          aria-hidden="true"
          className={`relative z-10 transition-all duration-500 group-hover/button:-translate-x-2 ${
            featured ? "" : "group-hover/button:text-white"
          }`}
        >
          ←
        </span>
      </Link>

      <PlanBottomLine index={index} featured={featured} />
    </PlanCardShell>
  );
}

export default function Plans() {
  return (
    <section
      id="plans"
      className="relative flex items-center overflow-hidden bg-[#f5f2ec] py-14 lg:h-[650px] lg:py-0"
    >
      {/* Ambient Light (CSS keyframes in globals.css) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px] motion-safe:animate-[glow-breathe_8s_ease-in-out_infinite]"
        style={{ background: "var(--primary)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <Reveal y={25} className="mb-6 text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            PACKAGES
          </span>

          <h2 className="mt-2 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
            برای هر لحظه،
            <span className="font-medium"> یک انتخاب.</span>
          </h2>
        </Reveal>

        <PlansCarousel labels={plans.map((plan) => plan.title)}>
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </PlansCarousel>

        {/* Note */}
        <Reveal y={0} delay={0.5}>
          <p className="mt-4 text-right text-[11px] leading-6 text-black/35">
            * قیمت‌ها نمونه هستند و با توجه به نوع مراسم و خدمات
            انتخابی قابل تغییر خواهند بود.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
