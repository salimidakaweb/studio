/* ------------------------------------------------------------------ */
/*  Editable content — change everything you need right here          */
/* ------------------------------------------------------------------ */

import HoverCard from "@/components/Ui/Hovercard";
import Reveal from "@/components/Ui/Reveal";


const intro = {
  eyebrow: "ABOUT ATELIER",
  title: "ما فقط عکس ثبت نمی‌کنیم،",
  highlight: "خاطره می‌سازیم.",
  lead: "در آتلیه بختیاری، هر تصویر شروع یک داستان است؛ داستانی از آدم‌ها و لحظه‌هایی که قرار نیست دوباره تکرار شوند. ما تلاش می‌کنیم این لحظه‌ها را زیبا، طبیعی و ماندگار ثبت کنیم.",
};

// Each section becomes its own <h2> + paragraphs (good for SEO structure).
// `stacked` sections sit in the right-hand column (two cards, stacked);
// the remaining section sits alone in the left-hand column, vertically centered.
const stackedSections = [
  {
    heading: "داستان ما",
    paragraphs: [
      "آتلیه بختیاری با عشق به عکاسی و برای ثبت لحظه‌هایی ساخته شد که شاید ساده باشند، اما برای شما ارزشمندند.",
    ],
  },
  {
    heading: "چرا آتلیه بختیاری؟",
    paragraphs: [
      "فضای آرام، تجهیزات حرفه‌ای و توجه به جزئیات؛ همه چیز آماده است تا تجربه‌ای متفاوت و دوست‌داشتنی داشته باشید.",
    ],
  },
];

const featuredSection = {
  heading: "نگاه ما به عکاسی",
  paragraphs: [
    "ما معتقدیم یک عکس خوب فقط یک تصویر زیبا نیست؛ بلکه باید احساس و شخصیت آن لحظه را منتقل کند.",
    "به همین دلیل پیش از هر جلسه، زمان می‌گذاریم تا شما و داستان‌تان را بهتر بشناسیم.",
    "نور، رنگ و کادربندی برای ما ابزارند؛ اما چیزی که در نهایت اهمیت دارد، احساسی است که از دیدن عکس‌هایتان خواهید داشت.",
  ],
};

const stats = [
  { value: "500+", label: "مشتری وفادار" },
  { value: "2K+", label: "خانواده همراه" },
  { value: "15+", label: "سال تجربه" },
];

/* ------------------------------------------------------------------ */

export default function AboutIntro() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-[300px] w-[300px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "var(--primary)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-12">
        {/* Page heading: the single <h1> of this page — centered, two-tone */}
        <Reveal y={25} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            {intro.eyebrow}
          </span>

          <h1 className="mt-3 text-3xl font-light leading-tight text-[#171512] sm:text-4xl lg:text-5xl">
            {intro.title}
            <br className="hidden sm:block" />{" "}
            <span className="font-medium text-[var(--primary)]">
              {intro.highlight}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-7 text-black/60 sm:text-sm sm:leading-8">
            {intro.lead}
          </p>
        </Reveal>

        {/* Stats — centered card */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <HoverCard className="rounded-3xl border border-black/5 bg-white/70 px-8 py-8 shadow-[0_20px_50px_-25px_rgba(20,18,15,0.15)] backdrop-blur-sm sm:px-14">
            <dl className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    index > 0 ? "border-r border-black/10 pr-10 sm:pr-16" : ""
                  }`}
                >
                  <dd className="text-2xl font-light text-[var(--primary-dark)] sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[11px] text-black/40 sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </HoverCard>
        </Reveal>

        {/* Text sections — hoverable cards.
            RTL grid: first column in the DOM renders on the right, so the
            two stacked cards (right side) come first, then the single
            featured card (left side, vertically centered). */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Right column: two stacked cards */}
          <div className="flex flex-col gap-6">
            {stackedSections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.08} className="h-full">
                <HoverCard className="h-full rounded-2xl border border-black/10 bg-white p-6 text-right sm:p-7">
                  <h2 className="text-lg font-medium text-[#171512] sm:text-xl">
                    {section.heading}
                  </h2>

                  <div className="mt-3 space-y-3 text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
                    {section.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          {/* Left column: single card, vertically centered */}
          <Reveal delay={0.16} className="flex h-full">
            <HoverCard className="flex h-full w-full flex-col justify-center rounded-2xl border border-black/10 bg-white p-6 text-right sm:p-7">
              <h2 className="text-lg font-medium text-[#171512] sm:text-xl">
                {featuredSection.heading}
              </h2>

              <div className="mt-3 space-y-3 text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
                {featuredSection.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}