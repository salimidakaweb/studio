import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";

// Server component. Only <Reveal /> (scroll fade-in) is client-side.
// Images now use next/image (was a raw <img> via motion.img) and the hover
// zoom is pure CSS.

// Grid is RTL, 4 columns x 2 rows on md+. Columns are numbered 1 (rightmost)
// to 4 (leftmost) by CSS, so we place each item explicitly instead of
// relying on source order / auto-flow (which was pushing "خانوادگی" down).
const portfolioItems = [
  {
    title: "عروسی",
    category: "WEDDING",
    image: "/images/slides/sample-1.jpg",
    className: "md:col-start-1 md:row-start-1 md:row-span-2",
  },
  {
    title: "پرتره",
    category: "PORTRAIT",
    image: "/images/slides/sample-2.jpg",
    className: "md:col-start-3 md:row-start-1",
  },
  {
    title: "عقد",
    category: "CEREMONY",
    image: "/images/slides/sample-3.jpg",
    className: "md:col-start-2 md:row-start-1",
  },
  {
    title: "کودک",
    category: "KIDS",
    image: "/images/slides/sample-2.jpg",
    className: "md:col-start-2 md:row-start-2 md:col-span-2",
  },
  {
    title: "خانوادگی",
    category: "FAMILY",
    image: "/images/slides/sample-3.jpg",
    className: "md:col-start-4 md:row-start-1 md:row-span-2",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="flex h-[670px] items-center overflow-hidden bg-[#171512] text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <Reveal y={20} className="mb-6 text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-light)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            SELECTED WORKS
          </span>

          <h2 className="mt-2 text-2xl font-light leading-tight sm:text-3xl lg:text-4xl">
            بعضی لحظه‌ها،
            <span className="font-medium"> دیدنی‌ترند.</span>
          </h2>
        </Reveal>

        {/* Gallery */}
        <div className="grid auto-rows-[110px] grid-cols-2 gap-3 sm:auto-rows-[140px] md:grid-cols-4 md:auto-rows-[150px]">
          {portfolioItems.map((item, index) => (
            <Reveal
              key={item.title}
              y={30}
              delay={index * 0.08}
              className={item.className}
            >
              <Link
                href={`/portfolio/${item.category.toLowerCase()}`}
                className="group relative block h-full overflow-hidden rounded-sm"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={`نمونه‌کار عکاسی ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-500 group-hover:from-[var(--primary-dark)]/70" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 lg:p-4">
                  <div className="flex justify-between">
                    <span className="text-[9px] tracking-[0.25em] text-white/70">
                      {item.category}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-xs text-white/70 transition-transform duration-300 group-hover:-translate-x-1"
                    >
                      ↙
                    </span>
                  </div>

                  <div className="translate-y-2 text-right opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-base font-medium text-white sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Button */}
        <Reveal y={15} className="mt-6 flex justify-center">
          <Link
            href="/gallery"
            className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs text-white transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-light)]"
          >
            <span>مشاهده تمام نمونه‌کارها</span>

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-2"
            >
              ←
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}