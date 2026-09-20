import { BlogPost } from "@/lib/Blog";
import Image from "next/image";
import Link from "next/link";


type BlogCardProps = {
  post: BlogPost;
  /** Load the image eagerly (use for the first row above the fold). */
  priority?: boolean;
};

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_16px_36px_-20px_rgba(20,18,15,0.3)] transition-shadow duration-500 hover:shadow-[0_22px_44px_-18px_rgba(20,18,15,0.38)]">
      {/* Image */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[9px] tracking-[0.15em] text-[var(--primary-dark)] backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 text-right">
        <time className="text-[10px] text-black/35">{post.date}</time>

        <h2 className="mt-2 text-sm font-medium leading-6 text-[#171512] line-clamp-2">
          <Link
            href={href}
            className="transition-colors duration-300 hover:text-[var(--primary-dark)]"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 flex-1 text-[12px] leading-6 text-black/50 line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href={href}
          aria-label={`مطالعه مقاله: ${post.title}`}
          className="group/btn mt-4 flex w-fit items-center gap-2 border-b border-[var(--primary)] pb-1.5 text-xs font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)]"
        >
          <span className="transition-transform duration-300 group-hover/btn:-translate-x-1.5">
            ←
          </span>
          مطالعه مقاله
        </Link>
      </div>
    </article>
  );
}