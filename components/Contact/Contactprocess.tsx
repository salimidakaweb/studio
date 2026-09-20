/* ------------------------------------------------------------------ */
/*  Editable content — steps of a photo session                        */
/*  NOTE: times below are SAMPLES. Replace them with your real ones.   */
/* ------------------------------------------------------------------ */

const process = {
  title: "مسیر یک جلسه عکاسی",
  description:
    "از اولین تماس تا تحویل آلبوم، این مراحل را با هم طی می‌کنیم.",
};

const steps = [
  {
    title: "تماس و مشاوره",
    text: "با ما تماس می‌گیرید و درباره نوع عکاسی، تعداد نفرات و ایده‌هایتان صحبت می‌کنیم.",
  },
  {
    title: "تعیین وقت",
    text: "زمان مناسب را با هم انتخاب می‌کنیم و راهنمای انتخاب لباس و آماده‌سازی برایتان ارسال می‌شود.",
  },
  {
    title: "روز عکاسی",
    text: "در فضایی آرام و بدون عجله عکاسی می‌کنیم. لازم نیست ژست بگیرید؛ خودتان باشید.",
  },
  {
    title: "انتخاب و تحویل",
    text: "عکس‌ها را با هم مرور می‌کنید، ادیت می‌شوند و در زمان اعلام‌شده تحویل می‌گیرید.",
  },
];

/* ------------------------------------------------------------------ */

export default function ContactProcess() {
  return (
    <div className="text-right">
      <h2 className="text-xl font-medium text-[#171512] sm:text-2xl">
        {process.title}
      </h2>

      <p className="mt-2 max-w-md text-[13px] leading-7 text-black/55 sm:text-sm">
        {process.description}
      </p>

      {/* Numbers are meaningful here: the content really is a sequence */}
      <ol className="relative mt-7">
        {/* The vertical line sits on the right edge (RTL start) */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-[15px] top-3 w-px bg-[var(--primary)]/25"
        />

        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
            <span
              aria-hidden="true"
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/40 bg-[#f5f2ec] text-xs text-[var(--primary-dark)]"
            >
              {(index + 1).toLocaleString("fa-IR")}
            </span>

            <div className="pt-0.5">
              <h3 className="text-sm font-medium text-[#171512]">
                {step.title}
              </h3>
              <p className="mt-1 text-[13px] leading-7 text-black/55">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}