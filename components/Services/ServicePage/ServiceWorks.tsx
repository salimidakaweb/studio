import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";

type WorkItem = {
  title: string;
  image: string;
  caption: string;
};

type ServiceWorksData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  galleryHref: string;
  galleryLabel: string;
  items: WorkItem[];
};

type ServiceWorksProps = {
  data: ServiceWorksData;
};

export default function ServiceWorks({ data }: ServiceWorksProps) {
  return (
    <section className="bg-[#f5f2ec] py-14 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <Reveal
          y={20}
          className="mb-9 flex flex-col gap-3 text-right md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              {data.eyebrow}
            </span>

            <h2 className="mt-3 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl">
              {data.title}
              <span className="font-medium"> {data.titleAccent}</span>
            </h2>
          </div>

          <Link
            href={data.galleryHref}
            className="group flex items-center justify-end gap-2 text-xs text-black/55 transition-colors duration-300 hover:text-[var(--primary-dark)]"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-2"
            >
              ←
            </span>
            {data.galleryLabel}
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {data.items.map((item, index) => (
            <Reveal key={item.title} y={24} delay={index * 0.1}>
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-3 text-sm font-medium text-[#171512] sm:text-[15px]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-black/50 sm:text-[13px] sm:leading-7">
                  {item.caption}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}