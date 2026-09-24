import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";
import PendulumLabel from "./PendulumLabel";
import type { CategoryData } from "@/data/categories";

// Server component: heading, links, images and labels are all in the initial
// HTML. Client leaves: <Reveal /> (scroll fade-in) and <PendulumLabel /> (swing).
//
// This is the same "triangle strip" that used to live on the home page as
// Categories.tsx. It is now generic over `data.services.items`, so it works
// for both /kids (5 items) and /wedding (4 items) category pages.

const R = 5;

function trianglePath(direction: "up" | "down"): string {
  const apex = direction === "up" ? { x: 50, y: 0 } : { x: 50, y: 100 };
  const left = direction === "up" ? { x: 0, y: 100 } : { x: 0, y: 0 };
  const right = direction === "up" ? { x: 100, y: 100 } : { x: 100, y: 0 };

  const pts = [apex, right, left];
  const n = pts.length;

  function pointToward(
    from: { x: number; y: number },
    to: { x: number; y: number },
    dist: number
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    const t = Math.min(dist / len, 0.49);
    return { x: from.x + dx * t, y: from.y + dy * t };
  }

  let d = "";
  for (let i = 0; i < n; i++) {
    const curr = pts[i];
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    const inPoint = pointToward(curr, prev, R);
    const outPoint = pointToward(curr, next, R);
    d +=
      i === 0
        ? `M ${inPoint.x} ${inPoint.y} `
        : `L ${inPoint.x} ${inPoint.y} `;
    d += `Q ${curr.x} ${curr.y} ${outPoint.x} ${outPoint.y} `;
  }
  return d + "Z";
}

const UP_PATH = trianglePath("up");
const DOWN_PATH = trianglePath("down");

export default function Categories({
  data,
}: {
  data: CategoryData["services"];
}) {
  const categories = data.items;

  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] py-16 lg:py-24">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath
            id="cat-triangle-up"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.01 0.01)"
          >
            <path d={UP_PATH} />
          </clipPath>
          <clipPath
            id="cat-triangle-down"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.01 0.01)"
          >
            <path d={DOWN_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal y={30} className="mb-16 text-right">
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
            <span className="h-px w-8 bg-[var(--primary)]" />
            {data.eyebrow}
          </span>
          <h2 className="mt-4 whitespace-nowrap text-2xl font-light text-black sm:text-4xl lg:text-6xl">
            {data.title} <span className="font-medium">{data.titleAccent}</span>
          </h2>
        </Reveal>

        <div
          className="relative mx-auto flex w-full overflow-visible"
          style={{ direction: "ltr", gap: 0 }}
        >
          {categories.map((category, index) => {
            const direction: "up" | "down" = index % 2 === 0 ? "up" : "down";
            const isLast = index === categories.length - 1;

            return (
              <Reveal
                key={category.href}
                y={direction === "up" ? 80 : -80}
                delay={index * 0.45}
                className={`relative flex-1 ${isLast ? "" : "-me-[12%]"}`}
              >
                <Link href={category.href} className="group block">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "0.85 / 1" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: `url(#cat-triangle-${direction})`,
                      }}
                    >
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 24vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
                      <div className="absolute inset-0 bg-[var(--primary)]/0 transition-all duration-500 group-hover:bg-[var(--primary)]/40" />
                    </div>
                  </div>

                  <div
                    className="flex justify-center"
                    style={{
                      marginTop: direction === "down" ? "-9px" : "-2px",
                    }}
                  >
                    <PendulumLabel
                      title={category.title}
                      direction={direction}
                      index={index}
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
