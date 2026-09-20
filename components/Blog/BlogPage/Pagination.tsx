import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  /** Base path; page number is added as ?page=N (page 1 stays clean). */
  basePath?: string;
};

function hrefFor(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

/** 1 … 4 5 6 … 12  (numbers + gaps). */
function getPageItems(page: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "gap")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) items.push("gap");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push("gap");

  items.push(total);
  return items;
}

const base =
  "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-xs transition-colors duration-300";
const idle =
  "border-black/10 bg-white text-black/60 hover:border-[var(--primary)] hover:text-[var(--primary-dark)]";
const current = "border-transparent bg-[var(--primary)] text-white";
const disabled = "pointer-events-none border-black/5 bg-transparent text-black/20";

export default function Pagination({
  page,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="صفحه‌بندی مقالات"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      {/* In RTL, "previous" sits on the right and points right */}
      {hasPrev ? (
        <Link
          href={hrefFor(basePath, page - 1)}
          rel="prev"
          className={`${base} ${idle} gap-2`}
        >
          <span aria-hidden="true">→</span>
          قبلی
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled} gap-2`}>
          <span aria-hidden="true">→</span>
          قبلی
        </span>
      )}

      <ul className="flex items-center gap-2">
        {getPageItems(page, totalPages).map((item, i) =>
          item === "gap" ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-black/30">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(basePath, item)}
                aria-label={`صفحه ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={`${base} ${item === page ? current : idle}`}
              >
                {item.toLocaleString("fa-IR")}
              </Link>
            </li>
          )
        )}
      </ul>

      {hasNext ? (
        <Link
          href={hrefFor(basePath, page + 1)}
          rel="next"
          className={`${base} ${idle} gap-2`}
        >
          بعدی
          <span aria-hidden="true">←</span>
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled} gap-2`}>
          بعدی
          <span aria-hidden="true">←</span>
        </span>
      )}
    </nav>
  );
}