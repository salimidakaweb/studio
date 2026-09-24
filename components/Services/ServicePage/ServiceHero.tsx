import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";

type ServiceHeroData = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ServiceHeroProps = {
  data: ServiceHeroData;
  /** Parent category page; drives the breadcrumb label + link. */
  category?: "kids" | "wedding";
};

// Parent page for each category (real, indexable URLs — good internal linking).
const CATEGORY_CRUMB = {
  kids: { label: "آتلیه کودک", href: "/kids" },
  wedding: { label: "آتلیه عروس و داماد", href: "/wedding" },
} as const;

const PHONE_DISPLAY = "۰۹۱۲ ۲۱۵ ۶۵۸۷";
const PHONE_HREF = "tel:+989122156587";

export default function ServiceHero({ data, category }: ServiceHeroProps) {
  const crumb = category ? CATEGORY_CRUMB[category] : CATEGORY_CRUMB.kids;

  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] pb-14 pt-8 lg:pb-20 lg:pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] rounded-full opacity-[0.08] blur-[110px]"
        style={{ background: "var(--primary)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="مسیر صفحه" className="mb-8 text-[12px] text-black/40">
          <ol className="flex items-center justify-end gap-2">
            <li>
              <Link
                href={crumb.href}
                className="transition-colors hover:text-[var(--primary-dark)]"
              >
                {crumb.label}
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li className="text-black/60">{data.breadcrumb}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* Text column */}
          <Reveal y={26} className="order-2 text-right lg:order-1">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              {data.eyebrow}
            </span>

            <h1 className="mt-3 text-3xl font-light leading-tight text-[#171512] sm:text-4xl lg:text-[2.75rem]">
              {data.title}
              <br className="hidden sm:block" />{" "}
              <span className="font-medium text-[var(--primary)]">
                {data.titleAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[13px] leading-7 text-black/60 sm:text-sm sm:leading-8">
              {data.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`${crumb.href}#booking`}
                className="btn-primary flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
              >
                رزرو نوبت
                <span aria-hidden="true">←</span>
              </Link>

              <a
                href={PHONE_HREF}
                dir="ltr"
                className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm text-[#171512] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-dark)]"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>

                {PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>

          {/* Image column */}
          <Reveal y={26} delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-[0_25px_60px_-20px_rgba(20,18,15,0.35)] sm:aspect-[16/11]">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}