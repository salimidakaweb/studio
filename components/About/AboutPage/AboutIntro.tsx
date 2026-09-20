

/* ------------------------------------------------------------------ */
/*  Editable content — change everything you need right here          */
/* ------------------------------------------------------------------ */

import Reveal from "@/components/Ui/Reveal";

const intro = {
  eyebrow: "ABOUT ATELIER",
  title: "ما فقط عکس",
  highlight: "ثبت نمی‌کنیم.",
  lead: "در آتلیه بختیاری، هر تصویر شروع یک داستان است؛ داستانی از آدم‌ها و لحظه‌هایی که قرار نیست دوباره تکرار شوند.",
};

// Each section becomes its own <h2> + paragraphs (good for SEO structure).
const sections = [
  {
    heading: "داستان ما",
    paragraphs: [
      "آتلیه بختیاری با عشق به عکاسی و باور به ارزش لحظه‌های ساده شروع شد. سال‌ها تجربه در عکاسی کودک، خانواده و مراسم به ما آموخته که بهترین عکس‌ها از دل آرامش و صمیمیت بیرون می‌آیند.",
      "این متن نمونه است و می‌توانید داستان واقعی آتلیه، سال تأسیس و مسیری که تا امروز طی کرده‌اید را اینجا بنویسید.",
    ],
  },
  {
    heading: "نگاه ما به عکاسی",
    paragraphs: [
      "ما معتقدیم یک عکس خوب فقط یک قاب زیبا نیست؛ بازتاب احساس و شخصیت آدم‌هاست. به همین دلیل پیش از هر جلسه، زمان می‌گذاریم تا شما و ایده‌هایتان را بشناسیم.",
      "نور، رنگ و ترکیب‌بندی برای ما ابزارند و روایت، هدف اصلی. این بخش را با دیدگاه و سبک خاص خودتان جایگزین کنید.",
    ],
  },
  {
    heading: "چرا آتلیه بختیاری؟",
    paragraphs: [
      "فضای آرام و مجهز، تیم حرفه‌ای، ادیت دقیق و تحویل به‌موقع؛ همه برای اینکه تجربه‌ای دلپذیر و نتیجه‌ای ماندگار داشته باشید.",
    ],
  },
];

const stats = [
  { value: "15+", label: "سال تجربه" },
  { value: "2K+", label: "خاطره ثبت‌شده" },
  { value: "500+", label: "مشتری راضی" },
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
        {/* Page heading: the single <h1> of this page */}
        <Reveal y={25} className="text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            {intro.eyebrow}
          </span>

          <h1 className="mt-3 text-3xl font-light leading-tight text-[#171512] sm:text-4xl lg:text-5xl">
            {intro.title}
            <span className="font-medium"> {intro.highlight}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[13px] leading-7 text-black/60 sm:text-sm sm:leading-8">
            {intro.lead}
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.1} className="mt-8">
          <dl className="flex justify-start gap-10 border-t border-black/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-right">
                <dd className="text-2xl font-light text-[var(--primary-dark)]">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[11px] text-black/40">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Text sections */}
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {sections.map((section, index) => (
            <Reveal
              key={section.heading}
              delay={index * 0.08}
              className="border-t border-black/10 pt-5 text-right"
            >
              <h2 className="text-lg font-medium text-[#171512] sm:text-xl">
                {section.heading}
              </h2>

              <div className="mt-3 space-y-3 text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}