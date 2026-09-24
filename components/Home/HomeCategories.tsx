import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";
import type { HomeData } from "@/data/home";

// Server component: heading, both category cards (h2/h3, description, alt,
// link) are in the initial HTML. Only <Reveal /> is client-side.
// These two links (/wedding and /kids) are the most important internal links
// of the whole site, so they are plain crawlable <a href> elements.

export default function HomeCategories({
  data,
}: {
  data: HomeData["categories"];
}) {
  return (
    <section
      id="studios"
      className="bg-[#f5f2ec] pt-14 lg:pt-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <Reveal y={20} className="mb-10 text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            {data.eyebrow}
          </span>

          <h2 className="mt-3 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
            {data.title}
            <span className="font-medium"> {data.titleAccent}</span>
          </h2>

          <p className="mt-3 max-w-xl text-[13px] leading-7 text-black/55 sm:text-sm">
            {data.description}
          </p>
        </Reveal>

        <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:gap-6">
          {data.items.map((item, index) => (
            <li key={item.href}>
              <Reveal y={28} delay={index * 0.1}>
                <Link
                  href={item.href}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-sm shadow-[0_18px_40px_-20px_rgba(20,18,15,0.35)] outline-none ring-[var(--primary)] focus-visible:ring-2"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 50vw, 360px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-colors duration-500 group-hover:from-[var(--primary-dark)]/80" />

                  <div className="absolute inset-x-0 bottom-0 p-4 text-right sm:p-6">
                    <h3 className="text-xl font-medium text-white sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-5 text-white/75 sm:text-xs sm:leading-6">
                      {item.description}
                    </p>

                    <span className="mt-3 flex items-center justify-end gap-2 text-[11px] text-white/85 sm:text-xs">
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      >
                        ←
                      </span>
                      {item.cta}
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
