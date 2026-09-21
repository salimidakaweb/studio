import Image from "next/image";
import Link from "next/link";
import BlogSlider from "./BlogSlider";

// Server component: heading, "view all" link and every post card (title,
// category, date, link) are in the initial HTML. Only the slider mechanics
// (drag, arrows, dots, autoplay) are client-side, in <BlogSlider />.

const posts = [
  {
    title: "چطور برای عکاسی عروسی آماده شویم؟",
    category: "راهنمای عکاسی",
    date: "۱۲ شهریور ۱۴۰۵",
    image: "/images/slides/sample-1.jpg",
  },
  {
    title: "چرا نور مهم‌ترین عنصر در یک عکس حرفه‌ای است؟",
    category: "آموزش",
    date: "۰۵ شهریور ۱۴۰۵",
    image: "/images/slides/sample-2.jpg",
  },
  {
    title: "انتخاب لوکیشن مناسب برای عکاسی فرمالیته",
    category: "ایده و الهام",
    date: "۲۸ مرداد ۱۴۰۵",
    image: "/images/slides/sample-3.jpg",
  },
  {
    title: "راهنمای کامل عکاسی کودک در آتلیه",
    category: "راهنمای عکاسی",
    date: "۲۰ مرداد ۱۴۰۵",
    image: "/images/slides/sample-1.jpg",
  },
  {
    title: "چیدمان و دکور مناسب برای جشن تولد",
    category: "ایده و الهام",
    date: "۱۴ مرداد ۱۴۰۵",
    image: "/images/slides/sample-3.jpg",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="flex h-[670px] items-center overflow-hidden bg-[#f5f2ec]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <BlogSlider
          count={posts.length}
          heading={
            <div className="text-right">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
                <span className="h-px w-6 bg-[var(--primary)]" />
                JOURNAL
              </span>

              <h2 className="mt-2 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
                از دنیای
                <span className="font-medium"> آتلیه بختیاری.</span>
              </h2>
            </div>
          }
          viewAll={
            <Link
              href="/blog"
              className="group flex items-center justify-end gap-2 text-xs text-black/55 transition-colors duration-300 hover:text-[var(--primary-dark)]"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-2"
              >
                ←
              </span>
              مشاهده همه مقالات
            </Link>
          }
        >
          {posts.map((post) => (
            <article
              key={post.title}
              data-card
              className="w-[78%] flex-shrink-0 sm:w-[46%] lg:w-[31.5%]"
            >
              {/* TODO: link each card to its own /blog/[slug] page once the
                  posts come from lib/Blog (unique URLs = better internal linking). */}
              <Link href="/blog" draggable={false} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                    draggable={false}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[9px] tracking-[0.15em] text-[var(--primary-dark)] backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                {/* Meta */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-black/35">
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-2 flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="text-base text-black/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[var(--primary)]"
                  >
                    ←
                  </span>

                  <h3 className="text-right text-sm font-medium leading-6 text-[#171512] line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </BlogSlider>
      </div>
    </section>
  );
}
