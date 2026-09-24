import Image from "next/image";
import Link from "next/link";
import BlogSlider from "./BlogSlider";
import type { CategoryData } from "@/data/categories";

// Server component: heading, "view all" link and every post card (title,
// category, date, link) are in the initial HTML. Only the slider mechanics
// (drag, arrows, dots, autoplay) are client-side, in <BlogSlider />.

export default function Blog({ data }: { data: CategoryData["blog"] }) {
  const posts = data.posts;

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
                {data.eyebrow}
              </span>

              <h2 className="mt-2 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
                {data.title}
                <span className="font-medium"> {data.titleAccent}</span>
              </h2>
            </div>
          }
          viewAll={
            <Link
              href={data.viewAllHref}
              className="group flex items-center justify-end gap-2 text-xs text-black/55 transition-colors duration-300 hover:text-[var(--primary-dark)]"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-2"
              >
                ←
              </span>
              {data.viewAllLabel}
            </Link>
          }
        >
          {posts.map((post) => (
            <article
              key={post.title}
              data-card
              className="w-[78%] flex-shrink-0 sm:w-[46%] lg:w-[31.5%]"
            >
              {/* TODO: point each `href` at its own /blog/[slug] page once posts
                  come from lib/Blog (unique URLs = better internal linking). */}
              <Link href={post.href} draggable={false} className="group block">
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
