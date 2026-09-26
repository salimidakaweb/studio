"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import { getPosts, POSTS_PER_PAGE, type PostsPage } from "@/lib/Blog";

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_16px_36px_-20px_rgba(20,18,15,0.3)]">
      <div className="aspect-[4/3] animate-pulse bg-black/[0.06]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-2 w-16 animate-pulse rounded bg-black/10" />
        <div className="h-4 w-full animate-pulse rounded bg-black/10" />
        <div className="h-3 w-full animate-pulse rounded bg-black/[0.07]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-black/[0.07]" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded bg-black/10" />
      </div>
    </div>
  );
}

export default function BlogListingClient() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const requested = Number.parseInt(pageParam ?? "1", 10);
  const pageNumber = Number.isNaN(requested) ? 1 : requested;

  const [data, setData] = useState<PostsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // getPosts is dynamic: if NEXT_PUBLIC_API_URL is set it fetches,
    // otherwise it returns SAMPLE instantly (still async so UI stays consistent).
    getPosts(pageNumber, POSTS_PER_PAGE)
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setLoading(false);

        // If user requested out-of-range page (e.g. /blog?page=999), getPosts clamps it.
        // Keep the URL in sync by replacing the param without a full reload,
        // but only if clamped page differs — avoids infinite loop.
        if (res.page !== pageNumber) {
          const url = new URL(window.location.href);
          if (res.page === 1) url.searchParams.delete("page");
          else url.searchParams.set("page", String(res.page));
          window.history.replaceState(null, "", url.toString());
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "خطا در دریافت مقالات");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pageNumber]);

  // Initial / page-change loading: show skeleton grid (same 9 slots).
  if (loading && !data) {
    return (
      <>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <li key={i}>
              <SkeletonCard />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <div className="h-10 w-64 animate-pulse rounded-full bg-black/5" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="rounded-sm border border-red-200 bg-red-50 px-6 py-10 text-center text-sm leading-7 text-red-700">
        <p>مشکلی در دریافت مقالات پیش آمد.</p>
        <p className="mt-1 text-xs text-red/70">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full border border-red-200 bg-white px-5 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-700 hover:text-white"
        >
          تلاش دوباره
        </button>
      </div>
    );
  }

  if (!data) return null;

  const { posts, page, totalPages } = data;

  return (
    <>
      {posts.length === 0 ? (
        <p className="rounded-sm bg-white px-6 py-12 text-center text-sm text-black/50 shadow">
          هنوز مقاله‌ای منتشر نشده است.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.id}>
              <BlogCard post={post} priority={index < 3 && page === 1} />
            </li>
          ))}
        </ul>
      )}

      {/* Pagination renders links (?page=N). Because this component reads useSearchParams,
          clicking a page link updates the URL and this effect re-fetches on the client —
          no full server re-render, fully dynamic (noindex requirement satisfied). */}
      <Pagination page={page} totalPages={totalPages} basePath="/blog" />

      {/* subtle loading indicator when changing pages but keeping old data visible */}
      {loading && (
        <p className="mt-6 text-center text-xs text-black/40">در حال به‌روزرسانی…</p>
      )}
    </>
  );
}
