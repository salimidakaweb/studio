/**
 * Blog data layer.
 *
 * Right now this returns SAMPLE data. When the real API is ready, replace ONLY
 * the body of `getPosts` with a fetch call — the page and components keep
 * working as long as the returned shape stays the same.
 *
 *   const res = await fetch(`${process.env.API_URL}/posts?page=${page}&limit=${limit}`);
 *   const json = await res.json();
 *   return { posts: json.data, total: json.total, page, pageSize: limit, totalPages: ... };
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

/* ------------------------------ data access ------------------------------ */

export async function getPosts(
  page = 1,
  pageSize = POSTS_PER_PAGE
): Promise<PostsPage> {
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