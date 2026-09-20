/* ------------------------------------------------------------------ */
/*  Editable content — FAQ                                             */
/*  NOTE: answers are SAMPLES (times, prices, policies). Replace them  */
/*  with your real ones — wrong info here can mislead customers.       */
/*  Export so the page can build FAQ structured data from the same     */
/*  list (one source of truth).                                        */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    question: "برای رزرو وقت چقدر زودتر باید تماس بگیرم؟",
    answer:
      "پیشنهاد ما این است که حداقل یک تا دو هفته قبل تماس بگیرید. در فصل‌های شلوغ مثل نوروز و پاییز، زمان‌های خوب زودتر پر می‌شود.",
  },
  {
    question: "یک جلسه عکاسی چقدر طول می‌کشد؟",
    answer:
      "بسته به نوع جلسه معمولاً بین یک تا سه ساعت. برای کودکان زمان را انعطاف‌پذیر در نظر می‌گیریم تا خسته نشوند.",
  },
  {
    question: "عکس‌ها چه زمانی آماده می‌شود؟",
    answer:
      "فایل‌های ادیت‌شده معمولاً ظرف ۷ تا ۱۰ روز کاری تحویل داده می‌شود. زمان دقیق را هنگام رزرو به شما اعلام می‌کنیم.",
  },
  {
    question: "برای عکاسی کودک باید چه چیزی همراه داشته باشم؟",
    answer:
      "یکی دو تعویض لباس، اسباب‌بازی یا وسیله‌ی مورد علاقه‌ی کودک و در صورت نیاز خوراکی سبک. بقیه‌اش با ما.",
  },
  {
    question: "امکان لغو یا تغییر زمان جلسه وجود دارد؟",
    answer:
      "بله. اگر دست‌کم ۲۴ ساعت قبل اطلاع بدهید، زمان جلسه را بدون هزینه‌ی اضافه جابه‌جا می‌کنیم.",
  },
];

/* ------------------------------------------------------------------ */

export default function ContactFaq() {
  return (
    <div className="text-right">
      <h2 className="text-xl font-medium text-[#171512] sm:text-2xl">
        سوالات متداول
      </h2>

      <p className="mt-2 max-w-md text-[13px] leading-7 text-black/55 sm:text-sm">
        پاسخ چند پرسش رایج پیش از رزرو. اگر جواب خود را پیدا نکردید، تماس
        بگیرید.
      </p>

      {/*
        Native <details>: works without JavaScript, and the answers are in the
        initial HTML, so it stays a Server Component and is fully indexable.
      */}
      <div className="mt-6 border-t border-black/10">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group border-b border-black/10 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
              <span>{faq.question}</span>

              {/* + turns into × when open: the response to the user's click */}
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center text-lg font-light text-[var(--primary)] transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>

            <p className="pb-5 pl-8 text-[13px] leading-7 text-black/55">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}