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
 * (`/blog/[slug]`) is Server-rendered for SEO and uses getPost(slug) below.
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

/**
 * A post body is an ordered list of blocks. This is the shape the API should
 * return in `content`, and it is rendered WITHOUT dangerouslySetInnerHTML.
 *
 *  - heading:   level 1..6 (a level-1 is rendered as <h2>: the page already
 *               has exactly one <h1>, the post title)
 *  - paragraph: plain text. Blank line = new line inside the paragraph.
 *  - image:     inline image (src, alt, optional caption, optional size)
 *  - list:      ordered / unordered list of plain strings
 *  - quote:     block quote (optional cite)
 */
export type BlogBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Intrinsic size, used only to reserve space (avoids layout shift). */
      width?: number;
      height?: number;
    }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string };

/** Single post = listing fields + featured image alt + full body. */
export type BlogPostFull = BlogPost & {
  /** Alt text for the featured image (falls back to the title). */
  imageAlt?: string;
  /** ISO date (2026-09-28) — used only for SEO/JSON-LD. Optional. */
  isoDate?: string;
  content: BlogBlock[];
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

/* -------------------------- sample post body -------------------------- */

// Every sample post shares this body so /blog/sample-post-N works end to end.
// It deliberately uses every block type (h1..h6, image, list, quote) so the
// article page can be checked visually. Replace with API data later.
const SAMPLE_CONTENT: BlogBlock[] = [
  {
    type: "paragraph",
    text: "این یک متن نمونه است تا ظاهر صفحه‌ی مقاله را بررسی کنید. بعداً متن واقعی از API دریافت می‌شود و جای این بخش قرار می‌گیرد. طول متن هر چقدر که باشد، صفحه به‌صورت خودکار آن را نمایش می‌دهد.",
  },
  { type: "heading", level: 2, text: "عنوان سطح دوم؛ بخش اصلی مقاله" },
  {
    type: "paragraph",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.",
  },
  {
    type: "image",
    src: "/images/slides/sample-2.jpg",
    alt: "نمونه‌ی تصویر داخل متن مقاله",
    caption: "زیرنویس تصویر (اختیاری)",
    width: 1600,
    height: 1000,
  },
  { type: "heading", level: 3, text: "عنوان سطح سوم؛ زیرمجموعه‌ی بخش" },
  {
    type: "paragraph",
    text: "در این پاراگراف درباره‌ی یک نکته‌ی جزئی‌تر صحبت می‌کنیم. عنوان‌ها به‌ترتیب و به‌صورت سلسله‌مراتبی استفاده می‌شوند تا هم خواننده و هم موتور جست‌وجو ساختار مقاله را بفهمند.",
  },
  {
    type: "list",
    items: [
      "اولین مورد از فهرست نقطه‌ای",
      "دومین مورد از فهرست نقطه‌ای",
      "سومین مورد از فهرست نقطه‌ای",
    ],
  },
  { type: "heading", level: 4, text: "عنوان سطح چهارم" },
  {
    type: "paragraph",
    text: "متنی کوتاه برای نمایش عنوان سطح چهارم. عنوان‌های سطح پنج و شش هم به همین شکل پشتیبانی می‌شوند.",
  },
  { type: "heading", level: 5, text: "عنوان سطح پنجم" },
  { type: "heading", level: 6, text: "عنوان سطح ششم" },
  {
    type: "quote",
    text: "بهترین عکس‌ها آن‌هایی هستند که لحظه را ثبت می‌کنند، نه صحنه را.",
    cite: "نمونه‌ی نقل‌قول",
  },
  {
    type: "list",
    ordered: true,
    items: ["مرحله‌ی اول", "مرحله‌ی دوم", "مرحله‌ی سوم"],
  },
  { type: "heading", level: 2, text: "جمع‌بندی" },
  {
    type: "paragraph",
    text: "این پایان متن نمونه است. با اتصال API، همین ساختار (آرایه‌ای از بلاک‌ها) از سرور دریافت و بدون هیچ تغییری در صفحه نمایش داده می‌شود.",
  },
];

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


/* ------------------------------ single post ------------------------------ */

function sampleFull(post: BlogPost): BlogPostFull {
  return {
    ...post,
    imageAlt: post.title,
    isoDate: "2026-09-01",
    content: SAMPLE_CONTENT,
  };
}

/** Every slug that exists in the sample data (used for static params). */
export function getSampleSlugs(): string[] {
  return SAMPLE_POSTS.map((p) => p.slug);
}

/**
 * Fetch ONE post by slug. Returns null when it does not exist (the page then
 * calls notFound()).
 *
 * - No API configured -> looks the slug up in SAMPLE_POSTS.
 * - API configured    -> GET `${API_BASE}/posts/${slug}`. A 404 means "no such
 *   post" (null). Any OTHER failure falls back to the sample, same as
 *   getPosts, so a flaky backend never takes the page down in dev.
 *
 * Accepted API shapes: the post itself, or wrapped as { data: post } /
 * { post }. `content` must be an array of BlogBlock.
 */
export async function getPost(slug: string): Promise<BlogPostFull | null> {
  // A malformed % sequence (e.g. /blog/%E0%A4%A) makes decodeURIComponent
  // throw; treat it as "no such post" instead of a 500.
  let cleanSlug = "";
  try {
    cleanSlug = decodeURIComponent(slug).trim();
  } catch {
    return null;
  }
  if (!cleanSlug) return null;

  const base = API_BASE?.trim().replace(/\/$/, "");
  const fromSample = () => {
    const found = SAMPLE_POSTS.find((p) => p.slug === cleanSlug);
    return found ? sampleFull(found) : null;
  };

  if (!base) return fromSample();

  try {
    const res = await fetch(`${base}/posts/${encodeURIComponent(cleanSlug)}`, {
      // Article pages are indexable: cache them, refresh every 5 minutes.
      next: { revalidate: 300 },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const json = (await res.json()) as Record<string, unknown>;
    const raw = (json.data ?? json.post ?? json) as Record<string, unknown>;

    if (!raw || typeof raw !== "object" || !Array.isArray(raw.content)) {
      throw new Error("Unexpected API payload shape");
    }
    return raw as unknown as BlogPostFull;
  } catch (err) {
    console.warn("[lib/Blog] Failed to fetch post, falling back to SAMPLE:", err);
    return fromSample();
  }
}