import { Suspense } from "react";
import type { Metadata } from "next";
import Reveal from "@/components/Ui/Reveal";
import BlogListingClient from "@/components/Blog/BlogPage/BlogListingClient";

// The blog listing is intentionally NOT indexed and not in the sitemap.
// Keep this as a Server Component so `metadata` still applies even though
// the list itself is fetched on the client (dynamic, noindex — no SEO cost).
export const metadata: Metadata = {
  title: "وبلاگ | آتلیه بختیاری",
  description: "مقالات و راهنمای عکاسی آتلیه بختیاری.",
  robots: { index: false, follow: true },
};

function BlogListingFallback() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="h-[340px] animate-pulse rounded-sm bg-white shadow-[0_16px_36px_-20px_rgba(20,18,15,0.3)]"
        />
      ))}
    </div>
  );
}

export default function BlogPage() {
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
            {/* Heading — still server-rendered (lightweight, no data fetch) */}
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

            {/* Dynamic listing — client-side fetch (noindex, so CSR is fine).
                Uses the same getPosts() shape as before; when NEXT_PUBLIC_API_URL
                is set it hits the real API, otherwise falls back to SAMPLE_POSTS. */}
            <Suspense fallback={<BlogListingFallback />}>
              <BlogListingClient />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
