/**
 * Blog data layer — dynamic (client-friendly) with SAMPLE fallback.
 *
 * - If NEXT_PUBLIC_API_URL is set, getPosts fetches from `${API_BASE}/posts?page=&limit=`.
 * - Otherwise it falls back to SAMPLE_POSTS (so the UI works without an API).
 *
 * This keeps the blog listing "dynamic" (client-side, no pre-rendered content)
 * while staying fully functional in dev / without backend.
 * When the real API is ready, just set NEXT_PUBLIC_API_URL — no page changes needed.
 *
 * The page that lists blogs (`/blog`) is purposely a Client Component (use client)
 * because this listing itself is noindex (robots: noindex). The single post page
 * (`/blog/[slug]`) will stay Server-rendered for SEO.
 */

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

export type PostsPage = {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export const POSTS_PER_PAGE = 9;

/* ------------------------------ sample data ------------------------------ */

const sampleImages = [
  "/images/slides/sample-1.jpg",
  "/images/slides/sample-2.jpg",
  "/images/slides/sample-3.jpg",
];
const sampleCategories = ["راهنمای عکاسی", "آموزش", "ایده و الهام"];

const sampleExcerpt =
  "این یک خلاصه‌ی نمونه از مقاله است. بعداً متن واقعی از API دریافت می‌شود و جایگزین این بخش خواهد شد تا کاربر با خواندن آن تصمیم بگیرد مقاله را کامل بخواند.";

// 23 posts -> 3 pages (9 + 9 + 5), so pagination can be tested for real.
const SAMPLE_POSTS: BlogPost[] = Array.from({ length: 23 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    slug: `sample-post-${n}`,
    title: `مقاله شماره ${n}`,
    excerpt: sampleExcerpt,
    category: sampleCategories[i % sampleCategories.length],
    date: `${String(((i * 3) % 28) + 1).padStart(2, "0")} شهریور ۱۴۰۵`,
    image: sampleImages[i % sampleImages.length],
  };
});

/* ------------------------------ dynamic fetch ------------------------------ */

// Public env so it is available in the browser (blog listing is client-side).
// Supports both NEXT_PUBLIC_API_URL and legacy API_URL (server).
const API_BASE =
  (typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL as string | undefined) ||
      (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ||
      (process.env.API_URL as string | undefined)
    : undefined) ?? "";

function normalizeApiPayload(
  json: unknown,
  fallbackPage: number,
  fallbackPageSize: number
): PostsPage | null {
  if (!json || typeof json !== "object") return null;
  const j = json as Record<string, unknown>;

  // Accept several shapes:
  // { data: BlogPost[], total, page, pageSize, totalPages }
  // { posts: BlogPost[], total, page, ... }
  // { data: { posts: [], total } } etc. — we try to be forgiving.
  const rawPosts = (j.data ?? j.posts ?? j.items) as unknown;
  let posts: BlogPost[] = [];
  if (Array.isArray(rawPosts)) {
    posts = rawPosts as BlogPost[];
  } else if (rawPosts && typeof rawPosts === "object") {
    const nested = rawPosts as Record<string, unknown>;
    if (Array.isArray(nested.posts)) posts = nested.posts as BlogPost[];
    else if (Array.isArray(nested.data)) posts = nested.data as BlogPost[];
  }

  const total =
    typeof j.total === "number"
      ? j.total
      : typeof (j as Record<string, unknown>).count === "number"
        ? ((j as Record<string, unknown>).count as number)
        : posts.length;

  const page = typeof j.page === "number" ? j.page : fallbackPage;
  const pageSize =
    typeof j.pageSize === "number"
      ? j.pageSize
      : typeof j.limit === "number"
        ? (j.limit as number)
        : fallbackPageSize;
  const totalPages =
    typeof j.totalPages === "number"
      ? j.totalPages
      : Math.max(1, Math.ceil(total / pageSize));

  if (!Array.isArray(posts)) return null;
  return { posts, total, page, pageSize, totalPages };
}

function samplePage(page: number, pageSize: number): PostsPage {
  const total = SAMPLE_POSTS.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (current - 1) * pageSize;

  return {
    posts: SAMPLE_POSTS.slice(start, start + pageSize),
    total,
    page: current,
    pageSize,
    totalPages,
  };
}

/* ------------------------------ data access ------------------------------ */

export async function getPosts(
  page = 1,
  pageSize = POSTS_PER_PAGE
): Promise<PostsPage> {
  const safeRequested = Number.isFinite(page) ? Math.floor(page) : 1;

  // No API configured -> instant sample fallback (no network, works offline).
  const base = API_BASE?.trim().replace(/\/$/, "");
  if (!base) {
    return samplePage(safeRequested, pageSize);
  }

  // Try real API, fall back to sample on any error (network, non-2xx, shape mismatch).
  try {
    const url = `${base}/posts?page=${encodeURIComponent(String(safeRequested))}&limit=${encodeURIComponent(String(pageSize))}`;
    const res = await fetch(url, {
      // Listing is noindex and should always be fresh.
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const json = await res.json();
    const normalized = normalizeApiPayload(json, safeRequested, pageSize);

    if (!normalized) throw new Error("Unexpected API payload shape");

    // Clamp page if API echoes back an out-of-range page.
    const totalPages = Math.max(1, normalized.totalPages);
    const current = Math.min(
      Math.max(1, normalized.page),
      totalPages
    );
    return {
      ...normalized,
      page: current,
      totalPages,
    };
  } catch (err) {
    // Useful in dev; silent in production aside from console.warn.
    console.warn(
      "[lib/Blog] Failed to fetch from API, falling back to SAMPLE_POSTS:",
      err
    );
    return samplePage(safeRequested, pageSize);
  }
}
