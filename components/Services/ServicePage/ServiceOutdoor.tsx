import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";

type ServiceOutdoorData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
};

type ServiceOutdoorProps = {
  data: ServiceOutdoorData;
};

export default function ServiceOutdoor({
  data,
}: ServiceOutdoorProps) {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal x={-30} y={0}>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm shadow-[0_25px_60px_-20px_rgba(20,18,15,0.3)] lg:max-w-none">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal x={30} y={0} delay={0.1} className="text-right">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              {data.eyebrow}
            </span>

            <h2 className="mt-3 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
              {data.title}
              <span className="font-medium"> {data.titleAccent}</span>
            </h2>

            <div className="mt-5 space-y-4 text-[13px] leading-7 text-black/60 sm:text-sm sm:leading-8">
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Link
              href="/#booking"
              className="btn-primary mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
            >
              رزرو نوبت
              <span aria-hidden="true">←</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}