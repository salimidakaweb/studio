import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";

// Server component. Only <Reveal /> (scroll fade-in) is client-side.

// Sample photos from /public/images/slides — no external hosts, so the
// section loads fine on Iranian networks. Swap in real shots per service later.
const services = [
  {
    title: "عکاسی عروسی",
    description: "ثبت لحظه‌های روزی که همیشه در خاطرتان می‌ماند.",
    image: "/images/slides/sample-1.jpg",
    href: "/services/wedding",
  },
  {
    title: "فیلم‌برداری",
    description: "روایت سینمایی لحظه‌های شما با نگاهی متفاوت.",
    image: "/images/slides/sample-2.jpg",
    href: "/services/filming",
  },
  {
    title: "عکاسی کودک",
    description: "شیرین‌ترین لحظه‌های کودکی، در فضایی صمیمی.",
    image: "/images/slides/sample-3.jpg",
    href: "/services/kids",
  },
  {
    title: "عکاسی پرتره",
    description: "تصویری ساده، حرفه‌ای و ماندگار از شما.",
    image: "/images/slides/sample-1.jpg",
    href: "/services/portrait",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#171512] py-12 text-white lg:flex lg:h-[670px] lg:items-center lg:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <Reveal
          y={16}
          className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <div className="text-right">
            <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-[var(--primary-light)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              OUR SERVICES
            </span>

            <h2 className="mt-3 text-2xl font-light leading-snug sm:text-3xl lg:text-4xl">
              هر لحظه،{" "}
              <span className="font-medium">یک روایت.</span>
            </h2>
          </div>

          <p className="max-w-sm text-right text-[13px] leading-6 text-white/50">
            از عروسی تا پرتره و کودک؛ داستان شما را با تصویر روایت می‌کنیم.
          </p>
        </Reveal>

        {/* Services row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {services.map((service, index) => (
            <Reveal key={service.href} y={24} delay={index * 0.08}>
              <Link
                href={service.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg outline-none ring-[var(--primary-light)] focus-visible:ring-2 sm:aspect-auto sm:h-[280px] lg:h-[420px]"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-colors duration-500 group-hover:from-[var(--primary-dark)]/80" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-right lg:p-5">
                  <h3 className="text-base font-medium lg:text-lg">
                    {service.title}
                  </h3>

                  {/* Description: opens on hover/focus on desktop. On small screens the cards are too narrow to show it, so it is visually hidden
                      (sr-only) instead of display:none — the text stays in the DOM for screen readers and crawlers. */}
                  <div className="max-lg:sr-only lg:grid lg:grid-rows-[0fr] lg:transition-[grid-template-rows] lg:duration-500 lg:ease-out lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                    <p className="overflow-hidden text-xs leading-6 text-white/75">
                      <span className="mt-2 block">{service.description}</span>
                    </p>
                  </div>

                  <span className="mt-3 flex items-center justify-end gap-2 text-xs text-white/80 transition-colors duration-300 group-hover:text-white">
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                    >
                      ←
                    </span>
                    مشاهده
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
