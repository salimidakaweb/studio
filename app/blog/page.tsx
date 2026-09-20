import BlogCard from "@/components/Blog/BlogPage/BlogCard";
import Pagination from "@/components/Blog/BlogPage/Pagination";
import Reveal from "@/components/Ui/Reveal";
import { getPosts } from "@/lib/Blog";
import type { Metadata } from "next";


// The blog listing is intentionally NOT indexed and not in the sitemap.
export const metadata: Metadata = {
  title: "وبلاگ | آتلیه بختیاری",
  description: "مقالات و راهنمای عکاسی آتلیه بختیاری.",
  robots: { index: false, follow: true },
};

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const requested = Number.parseInt(pageParam ?? "1", 10);

  const { posts, page, totalPages } = await getPosts(
    Number.isNaN(requested) ? 1 : requested
  );

  return (
    <>

      <main className="bg-[#f5f2ec]">
        <section className="relative overflow-hidden py-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-10 h-[300px] w-[300px] rounded-full opacity-[0.07] blur-[100px]"
            style={{ background: "var(--primary)" }}
          />

          <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-12">
            {/* Heading */}
            <Reveal y={25} className="mb-10 text-right">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
                <span className="h-px w-6 bg-[var(--primary)]" />
                JOURNAL
              </span>

              <h1 className="mt-3 text-3xl font-light leading-tight text-[#171512] sm:text-4xl lg:text-5xl">
                وبلاگ
                <span className="font-medium"> آتلیه بختیاری</span>
              </h1>

              <p className="mt-4 max-w-2xl text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
                راهنما، ایده و نکته‌های عکاسی؛ برای اینکه بهتر آماده شوید و
                بیشتر لذت ببرید.
              </p>
            </Reveal>

            {/* 3 columns x 3 rows on desktop (9 per page) */}
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <li key={post.id}>
                  <BlogCard post={post} priority={index < 3} />
                </li>
              ))}
            </ul>

            <Pagination page={page} totalPages={totalPages} basePath="/blog" />
          </div>
        </section>
      </main>

    </>
  );
}