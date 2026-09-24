import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";
import HomeVideoClient from "./HomeVideoClient";
import type { HomeData } from "@/data/home";

// Server component: the "About" heading / text / link and the video title +
// description are in the initial HTML. Video mechanics are in the client leaf.
// Layout follows the Figma: video on the left, about text on the right (RTL).

export default function HomeAboutVideo({
  video,
  about,
}: {
  video: HomeData["video"];
  about: HomeData["about"];
}) {
  return (
    <section
      id="about"
      className="bg-[#f5f2ec] pt-2 lg:pt-30"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* About text (first in source = right side in RTL) */}
        <Reveal x={30} y={0} className="text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            {about.eyebrow}
          </span>

          <h2 className="mt-3 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
            {about.title}
          </h2>

          <p className="mt-4 max-w-md text-[13px] leading-7 text-black/60 sm:text-sm sm:leading-8">
            {about.description}
          </p>

          <Link
            href={about.cta.href}
            className="group mt-6 inline-flex items-center gap-3 border-b border-[var(--primary)] pb-2 text-xs font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)]"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-2"
            >
              ←
            </span>
            {about.cta.label}
          </Link>
        </Reveal>

        {/* Video */}
        <Reveal x={-30} y={0} delay={0.1}>
          <HomeVideoClient
            src={video.src}
            poster={video.poster}
            posterAlt={video.posterAlt}
            title={video.title}
          />
          <p className="sr-only">{video.description}</p>
        </Reveal>
      </div>
    </section>
  );
}
