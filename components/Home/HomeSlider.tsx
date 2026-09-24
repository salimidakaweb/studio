import Image from "next/image";
import Link from "next/link";
import HomeSliderClient from "./HomeSliderClient";
import type { HomeData } from "@/data/home";

// Server component: the page's <h1>, the subtitle, the CTA links and every
// slide (image alt, caption, link) are in the initial HTML. Only the slide
// mechanics (autoplay / arrows / dots) live in <HomeSliderClient />.

export default function HomeSlider({ data }: { data: HomeData["slider"] }) {
  const slides = data.slides.map((slide, i) => (
    <Link
      key={slide.image + i}
      href={slide.href}
      tabIndex={i === 0 ? 0 : -1}
      className="group absolute inset-0 block"
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority={i === 0}
        sizes="100vw"
        className="object-cover"
      />
      <span className="absolute bottom-16 right-6 rounded-full bg-white/15 px-4 py-1.5 text-xs text-white backdrop-blur-md transition group-hover:bg-white/25 sm:right-10 lg:right-16">
        {slide.caption}
      </span>
    </Link>
  ));

  return (
    <section aria-label="اسلایدر" className="relative">
      <HomeSliderClient
        count={data.slides.length}
        slides={slides}
        labels={data.slides.map((s) => s.caption)}
      >
        {/* Readability gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/25 to-black/30"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="pointer-events-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              {data.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={data.primaryCta.href}
                className="btn-primary rounded-full px-8 py-3 text-sm font-medium text-white"
              >
                {data.primaryCta.label}
              </Link>
              <Link
                href={data.secondaryCta.href}
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {data.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </HomeSliderClient>
    </section>
  );
}
