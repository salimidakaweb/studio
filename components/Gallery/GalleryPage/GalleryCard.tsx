import Image from "next/image";
import { GalleryAlbum } from "@/lib/Gallery";

type GalleryCardProps = {
  album: GalleryAlbum;
  onOpen: () => void;
  /** Load the cover image eagerly (use for the first row above the fold). */
  priority?: boolean;
};

export default function GalleryCard({
  album,
  onOpen,
  priority = false,
}: GalleryCardProps) {
  const cover = album.images[0];
  const extraCount = album.images.length - 1;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_16px_36px_-20px_rgba(20,18,15,0.3)] transition-shadow duration-500 hover:shadow-[0_22px_44px_-18px_rgba(20,18,15,0.38)]">
      {/* Cover image — clicking anywhere on the card opens the popup */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`مشاهده تصاویر ${album.title}`}
        className="relative block aspect-[4/3] w-full overflow-hidden text-right"
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[9px] tracking-[0.15em] text-[var(--primary-dark)] backdrop-blur-sm">
          {album.category}
        </span>

        {extraCount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[9px] tracking-[0.1em] text-white backdrop-blur-sm">
            +{extraCount.toLocaleString("fa-IR")} تصویر
          </span>
        )}
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 text-right">
        <h2 className="text-sm font-medium leading-6 text-[#171512] line-clamp-1">
          <button
            type="button"
            onClick={onOpen}
            className="transition-colors duration-300 hover:text-[var(--primary-dark)]"
          >
            {album.title}
          </button>
        </h2>

        <p className="mt-2 flex-1 text-[12px] leading-6 text-black/50 line-clamp-2">
          {album.excerpt}
        </p>

        <button
          type="button"
          onClick={onOpen}
          aria-label={`مشاهده بیشتر تصاویر ${album.title}`}
          className="group/btn mt-4 flex w-fit items-center gap-2 border-b border-[var(--primary)] pb-1.5 text-xs font-medium text-[#171512] transition-colors duration-300 hover:text-[var(--primary-dark)]"
        >
          <span className="transition-transform duration-300 group-hover/btn:-translate-x-1.5">
            ←
          </span>
          مشاهده بیشتر تصاویر
        </button>
      </div>
    </article>
  );
}
