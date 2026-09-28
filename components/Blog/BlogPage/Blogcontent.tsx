import Image from "next/image";
import type { BlogBlock } from "@/lib/Blog";

// Server component. Renders the article body from an array of blocks as plain,
// semantic HTML (no dangerouslySetInnerHTML -> no XSS, and headings/paragraphs
// are in the initial HTML for search engines).

/**
 * The page already has exactly ONE <h1> (the post title), so a level-1 heading
 * inside the body is rendered as <h2>. Levels 2..6 map 1:1.
 */
const HEADING_TAG = {
  1: "h2",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const HEADING_CLASS = {
  1: "mt-12 mb-4 text-2xl font-medium leading-[1.6] text-[#171512] sm:text-[1.75rem]",
  2: "mt-12 mb-4 text-2xl font-medium leading-[1.6] text-[#171512] sm:text-[1.75rem]",
  3: "mt-10 mb-3 text-xl font-medium leading-[1.7] text-[#171512] sm:text-2xl",
  4: "mt-8 mb-3 text-lg font-medium leading-[1.7] text-[#171512]",
  5: "mt-6 mb-2 text-base font-bold leading-[1.8] text-[#171512]",
  6: "mt-6 mb-2 text-sm font-bold leading-[1.8] tracking-wide text-black/70",
} as const;

/** URL-safe id for in-page anchors. Keeps Persian letters. */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u200c\u200f\u200e]/g, "") // ZWNJ / RLM / LRM
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isSafeImageSrc(src: string) {
  // local files (/images/...) or https URLs. Blocks javascript:, data:, etc.
  return src.startsWith("/") || /^https:\/\//i.test(src);
}

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  // Make heading ids unique even if two headings share the same text.
  const usedIds = new Map<string, number>();
  const uniqueId = (raw: string) => {
    const base = raw || "section";
    const n = usedIds.get(base) ?? 0;
    usedIds.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  };

  return (
    <div className="text-right text-[15px] leading-[2.1] text-black/75 sm:text-base sm:leading-[2.2]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const level = (block.level >= 1 && block.level <= 6
              ? block.level
              : 2) as 1 | 2 | 3 | 4 | 5 | 6;
            const Tag = HEADING_TAG[level];
            const id = block.id || uniqueId(slugifyHeading(block.text));
            return (
              <Tag
                key={i}
                id={id}
                className={`${HEADING_CLASS[level]} scroll-mt-28`}
              >
                {block.text}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={i} className="my-5 whitespace-pre-line">
                {block.text}
              </p>
            );

          case "image": {
            if (!isSafeImageSrc(block.src)) return null;
            const width = block.width && block.width > 0 ? block.width : 1600;
            const height = block.height && block.height > 0 ? block.height : 1000;
            return (
              <figure key={i} className="my-10">
                <div className="overflow-hidden rounded-sm bg-black/[0.04] shadow-[0_16px_36px_-20px_rgba(20,18,15,0.3)]">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={width}
                    height={height}
                    sizes="(min-width: 1024px) 768px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-xs leading-6 text-black/45">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={`my-6 space-y-2 pr-6 ${
                  block.ordered ? "list-decimal" : "list-disc"
                } marker:text-[var(--primary)]`}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pr-1">
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-r-2 border-[var(--primary)] bg-white/60 py-4 pr-6 pl-4 text-lg font-medium leading-[2] text-[#171512]"
              >
                <p>{block.text}</p>
                {block.cite ? (
                  <footer className="mt-2 text-xs font-normal text-black/45">
                    — {block.cite}
                  </footer>
                ) : null}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}