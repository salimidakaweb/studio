import Link from "next/link";
import HeroCamera from "./HeroCamera";
import type { CategoryData } from "@/data/categories";

// Server component: the h1 / paragraph / buttons are in the initial HTML.
// The only client-side piece is <HeroCamera slides={data.slides} /> (mouse-follow camera + LCD slider).
// Entrance: the text (.hero-fade-up) and the camera (.hero-camera-in) are both CSS
// animations that start together, once <HeroCamera slides={data.slides} /> marks the section as
// data-hero-ready (= camera image loaded). See globals.css.

// Content (eyebrow / h1 / paragraph / CTAs / camera slides) comes from `data`, so
// the kids and wedding pages share this exact component with different copy.

export default function Hero({ data }: { data: CategoryData["hero"] }) {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 45%, #1B2A33 0%, #0F1B22 45%, #0A1318 100%)",
      }}
    >
      {/* Without JS the "ready" signal never comes, so just play the entrance. */}
      <noscript>
        <style>{`.hero-fade-up,.hero-camera-in{animation-play-state:running!important}`}</style>
      </noscript>

      {/* Soft ambient glow behind the camera */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[700px] w-[700px] rounded-full opacity-30 blur-[150px] [--glow-max:0.34] [--glow-min:0.18] motion-safe:animate-[glow-pulse_7s_ease-in-out_infinite] lg:right-[58%]"
        style={{ background: "var(--primary)" }}
      />

      {/* Fine vignette to keep the corners calm and let the camera read clearly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 42%, transparent 40%, rgba(6,10,13,0.55) 100%)",
        }}
      />

      {/* Two-column layout: camera on the physical left, content on the physical right */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col-reverse items-center gap-10 px-6 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-4 lg:px-16">
        <HeroCamera slides={data.slides} />

        <div className="hero-fade-up w-full max-w-xl text-center lg:text-right">
          <span className="text-sm tracking-[0.05em] text-[var(--primary)] md:tracking-[0.3em]">
            {data.eyebrow}
          </span>

          <h1 className="mt-4 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
            {data.title}
            <br />
            {data.titleAccent}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            {data.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-end">
            <Link
              href={data.primaryCta.href}
              className="rounded-full bg-[var(--primary)] px-8 py-3 text-center font-medium text-white transition hover:opacity-90"
            >
              {data.primaryCta.label}
            </Link>
            <Link
              href={data.secondaryCta.href}
              className="rounded-full border border-white/25 px-8 py-3 text-center font-medium text-white transition hover:bg-white/10"
            >
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}