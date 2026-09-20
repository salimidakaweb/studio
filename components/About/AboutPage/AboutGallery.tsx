import Reveal from "@/components/Ui/Reveal";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Editable content — swap the images/alts later                      */
/*  Put new photos in /public/images/... and change `src` below.       */
/*  Keep `alt` descriptive: Google Images uses it.                     */
/* ------------------------------------------------------------------ */

const gallery = {
  eyebrow: "OUR STUDIO",
  title: "نگاهی به",
  highlight: "فضای آتلیه",
  description:
    "چند قاب از فضای آتلیه و لحظه‌هایی که در آن ثبت می‌شود. این تصاویر نمونه هستند و بعداً می‌توانید عکس‌های واقعی آتلیه را جایگزین کنید.",
};

const photos = [
  {
    src: "/images/slides/sample-1.jpg",
    alt: "فضای آتلیه بختیاری هنگام عکاسی کودک",
    caption: "فضای عکاسی",
  },
  {
    src: "/images/slides/sample-2.jpg",
    alt: "نمونه‌ای از دکور و نورپردازی آتلیه بختیاری",
    caption: "دکور و نور",
  },
  {
    src: "/images/slides/sample-3.jpg",
    alt: "لحظه‌ای از یک جلسه عکاسی خانوادگی در آتلیه بختیاری",
    caption: "جلسه خانوادگی",
  },
  {
    src: "/images/slides/sample-2.jpg",
    alt: "گوشه‌ای از آتلیه بختیاری با تجهیزات حرفه‌ای عکاسی",
    caption: "تجهیزات حرفه‌ای",
  },
  {
    src: "/images/slides/sample-3.jpg",
    alt: "نمونه‌ای از ثبت لحظه‌های خاص در آتلیه بختیاری",
    caption: "لحظه‌های خاص",
  },
  {
    src: "/images/slides/sample-1.jpg",
    alt: "نمایی از محیط آرام و صمیمی آتلیه بختیاری",
    caption: "محیط صمیمی",
  },
];

/* ------------------------------------------------------------------ */

export default function AboutGallery() {
  return (
    <section
      aria-labelledby="studio-gallery-title"
      className="relative overflow-hidden pb-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <Reveal className="mb-8 border-t border-black/10 pt-10 text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            {gallery.eyebrow}
          </span>

          <h2
            id="studio-gallery-title"
            className="mt-3 text-2xl font-light leading-tight text-[#171512] sm:text-3xl lg:text-4xl"
          >
            {gallery.title}
            <span className="font-medium"> {gallery.highlight}</span>
          </h2>

          <p className="mt-4 max-w-2xl text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
            {gallery.description}
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <li key={`${photo.src}-${index}`}>
              <Reveal delay={(index % 3) * 0.08} y={30}>
                <figure className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-[0_16px_36px_-18px_rgba(20,18,15,0.3)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      // First row is above the fold on desktop: load it eagerly
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/0" />
                  </div>

                  <figcaption className="mt-2.5 text-right text-[11px] text-black/45">
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}