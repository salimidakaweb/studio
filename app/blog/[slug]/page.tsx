import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPost, getSampleSlugs, type BlogPostFull } from "@/lib/Blog";
import { SITE_NAME, SITE_URL, abs } from "@/lib/seo";
import BlogContent from "@/components/Blog/BlogPage/Blogcontent";

// Server Component on purpose: the whole article (title, headings, text) is in
// the initial HTML so it can be indexed. Unlike the /blog listing, article
// pages ARE indexable.

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render the known sample posts. Once the API is live, new slugs are
// rendered on demand and then cached (dynamicParams stays true).
export function generateStaticParams() {
  return getSampleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = true;

/** Short plain-text description from the post (excerpt, else first paragraph). */
function describe(post: BlogPostFull) {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  const firstP = post.content.find((b) => b.type === "paragraph");
  return firstP && firstP.type === "paragraph"
    ? firstP.text.slice(0, 160)
    : post.title;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "مقاله پیدا نشد | " + SITE_NAME, robots: { index: false } };

  const path = `/blog/${post.slug}`;
  const description = describe(post);

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      locale: "fa_IR",
      url: path,
      siteName: SITE_NAME,
      images: [post.image],
      ...(post.isoDate ? { publishedTime: post.isoDate } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const pageUrl = abs(`/blog/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        description: describe(post),
        image: abs(post.image),
        inLanguage: "fa-IR",
        articleSection: post.category,
        ...(post.isoDate
          ? { datePublished: post.isoDate, dateModified: post.isoDate }
          : {}),
        mainEntityOfPage: pageUrl,
        author: { "@id": `${SITE_URL}/#business` },
        publisher: { "@id": `${SITE_URL}/#business` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "وبلاگ", item: abs("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="bg-[#f5f2ec]">
        <article className="relative overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-10 h-[300px] w-[300px] rounded-full opacity-[0.07] blur-[100px]"
            style={{ background: "var(--primary)" }}
          />

          <div className="relative mx-auto w-full max-w-3xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="مسیر صفحه" className="mb-6 text-right">
              <ol className="flex flex-wrap items-center gap-2 text-[11px] text-black/45">
                <li>
                  <Link href="/" className="transition-colors hover:text-[var(--primary-dark)]">
                    خانه
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-[var(--primary-dark)]">
                    وبلاگ
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="text-right">
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-black/45">
                <span className="rounded-full bg-white px-3 py-1 tracking-[0.1em] text-[var(--primary-dark)] shadow-sm">
                  {post.category}
                </span>
                <time dateTime={post.isoDate}>{post.date}</time>
              </div>

              <h1 className="mt-4 text-3xl font-medium leading-[1.5] text-[#171512] sm:text-4xl lg:text-[2.6rem]">
                {post.title}
              </h1>
            </header>

            {/* Featured image */}
            <figure className="mt-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black/[0.06] shadow-[0_22px_44px_-20px_rgba(20,18,15,0.35)]">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>

            {/* Body */}
            <div className="mt-10">
              <BlogContent blocks={post.content} />
            </div>

            {/* Footer / back link */}
            <footer className="mt-14 border-t border-black/10 pt-8 text-right">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 border-b border-[var(--primary)] pb-1.5 text-xs font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)]"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
                بازگشت به همه‌ی مقالات
              </Link>
            </footer>
          </div>
        </article>
      </main>
    </>
  );
}