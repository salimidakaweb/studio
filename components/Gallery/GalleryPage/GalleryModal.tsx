"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { GalleryAlbum } from "@/lib/Gallery";

type GalleryModalProps = {
  album: GalleryAlbum | null;
  onClose: () => void;
};

export default function GalleryModal({ album, onClose }: GalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to the cover image whenever a different album is opened
  // (but not on every re-render while the same album stays open).
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  useEffect(() => {
    if (album && album.id !== openAlbumId) {
      setActiveIndex(0);
      setOpenAlbumId(album.id);
    }
    if (!album && openAlbumId !== null) {
      setOpenAlbumId(null);
    }
  }, [album, openAlbumId]);

  // Lock page scroll while the popup is open (same approach as the mobile nav menu).
  useEffect(() => {
    if (!album) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    };
  }, [album]);

  const total = album?.images.length ?? 0;

  const goNext = () => {
    if (total < 2) return;
    setActiveIndex((current) => (current + 1) % total);
  };

  const goPrev = () => {
    if (total < 2) return;
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  // Escape to close, arrow keys to move between images.
  useEffect(() => {
    if (!album) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [album, onClose, total]);

  return (
    <AnimatePresence>
      {album && (
        <motion.div
          key="gallery-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={album.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            key="gallery-modal-content"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm bg-[#171512] text-white"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f7f8] text-black backdrop-blur-sm transition-colors duration-300 hover:bg-[var(--primary)] hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Main image */}
            <div className="relative aspect-[4/3] w-full shrink-0 bg-black sm:aspect-[16/10]">
              <Image
                src={album.images[activeIndex].src}
                alt={album.images[activeIndex].alt}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />

              {album.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="تصویر قبلی"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--background-light)] text-[var(--primary-dark)] transition-colors duration-300 hover:bg-[var(--primary)] hover:text-white"
                  >
                    <span aria-hidden="true">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="تصویر بعدی"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--background-light)] text-[var(--primary-dark)] transition-colors duration-300 hover:bg-[var(--primary)] hover:text-white"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              )}
            </div>

            {/* Info + thumbnails */}
            <div className="flex flex-col gap-4 overflow-y-auto p-4 sm:p-5">
              <div className="text-right">
                <span className="text-[9px] tracking-[0.2em] text-white/50">
                  {album.category}
                </span>
                <h3 className="mt-1 text-base font-medium sm:text-lg">
                  {album.title}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-white/60">
                  {album.excerpt}
                </p>
              </div>

              {album.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {album.images.map((img, index) => (
                    <button
                      key={img.src + index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`تصویر شماره ${index + 1}`}
                      aria-current={index === activeIndex}
                      className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-sm transition-all duration-300 ${
                        index === activeIndex
                          ? "opacity-100 ring-2 ring-[var(--primary)]"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}