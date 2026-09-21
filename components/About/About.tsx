import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";

// Server component. Only <Reveal /> (scroll slide-in) is client-side.

export default function About() {
  return (
    <section
      id="about"
      className="relative flex h-[670px] items-center overflow-hidden bg-[#f5f2ec]"
    >
      {/* Subtle brand-tinted ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "var(--primary)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Image */}
        <Reveal
          x={-40}
          y={0}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_16px_36px_-16px_rgba(20,18,15,0.3)]">
            <Image
              src="/images/slides/sample-1.jpg"
              alt="نمایی از آتلیه عکاسی بختیاری"
              fill
              sizes="320px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Decorative frame offset in brand color */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-sm border border-[var(--primary)]/25"
          />

          {/* Decorative Number */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-3 text-[64px] font-light leading-none text-black/5 sm:text-[80px]"
          >
            15
          </div>
        </Reveal>

        {/* Content */}
        <Reveal x={40} y={0} delay={0.15} className="text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            ABOUT ATELIER
          </span>

          <h2 className="mt-3 text-2xl font-light leading-[1.3] text-[#171512] sm:text-3xl lg:text-4xl">
            ما فقط عکس
            <span className="font-medium"> ثبت نمی‌کنیم.</span>
          </h2>

          <div className="mt-4 max-w-md mr-auto space-y-3 text-[13px] leading-7 text-black/60 sm:text-sm">
            <p>
              در آتلیه بختیاری، هر تصویر شروع یک داستان است؛
              داستانی از آدم‌ها و لحظه‌هایی که قرار نیست دوباره تکرار شوند.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 flex justify-end gap-8 border-t border-black/10 pt-5">
            <div className="text-right">
              <div className="text-2xl font-light text-[var(--primary-dark)]">
                15+
              </div>

              <div className="mt-1 text-[11px] text-black/40">سال تجربه</div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-light text-[var(--primary-dark)]">
                2K+
              </div>

              <div className="mt-1 text-[11px] text-black/40">
                خاطره ثبت‌شده
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 flex justify-end">
            <Link
              href="/about"
              className="group flex items-center gap-3 border-b border-[var(--primary)] pb-2 text-xs font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)]"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-2"
              >
                ←
              </span>
              بیشتر درباره ما
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
