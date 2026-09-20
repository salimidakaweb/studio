"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { title: "خانه", href: "/" },
  { title: "خدمات", href: "/#services" },
  { title: "گالری", href: "/#portfolio" },
  { title: "وبلاگ", href: "/blog" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  // `position: fixed` on body is the only approach that reliably stops
  // scrolling on iOS Safari; we restore the exact scroll position on close.
  useEffect(() => {
    if (!isOpen) return;

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
      // Restore without the smooth-scroll animation defined in globals.css
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    };
  }, [isOpen]);

  // Close the menu on Escape, or if the viewport grows to desktop size.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [isOpen]);

  return (
    <>
      {/* Spacer so page content doesn't jump under the fixed bar */}
      <div className="h-24" />

      {/* Blurred backdrop behind the mobile menu; tap to close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
      >
        <motion.header
          animate={{
            marginTop: scrolled ? 16 : 0,
            width: scrolled ? "min(96%, 1180px)" : "100%",
            borderRadius: scrolled ? 999 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`text-[#171512] [color-scheme:light] ${
            scrolled
              ? "border border-white/60 bg-white/70 shadow-[0_15px_45px_-15px_rgba(20,18,15,0.25)] backdrop-blur-xl"
              : "border-b border-black/5 bg-white shadow-none"
          }`}
        >
          <nav className="flex h-20 items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-10">
            {/* Logo + brand name (logo first, i.e. right side in RTL) */}
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/images/logo.png"
                alt="آتلیه بختیاری"
                width={56}
                height={56}
                className="h-11 w-11 object-contain sm:h-14 sm:w-14"
                priority
              />

              <span className="hidden h-9 w-px bg-black/10 sm:block" />

              <div className="text-right leading-tight">
                <div className="text-lg font-bold tracking-tight text-[#171512] sm:text-xl">
                  استودیو عکاسی{" "}
                  <span className="text-[var(--primary)]">بختیاری</span>
                </div>

                <div className="mt-0.5 text-[11px] tracking-wide text-black/40">
                  Bakhtiari Photography Studio
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 text-sm font-medium transition-colors duration-300 ${
                      active
                        ? "text-[var(--primary)]"
                        : "text-black/70 hover:text-[var(--primary)]"
                    }`}
                  >
                    {item.title}

                    <span
                      className={`absolute -bottom-0.5 right-0 h-[2px] bg-[var(--primary)] transition-all duration-300 ease-out ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right-side actions (visually left, due to RTL flex order) */}
            <div className="hidden items-center gap-3 lg:flex">
              {/* Phone pill */}
              <a
                href="tel:+989121234567"
                dir="ltr"
                className="flex items-center gap-2 rounded-full border border-[var(--primary)]/30 px-4 py-2.5 text-sm font-medium text-[var(--primary)] transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02z" />
                </svg>
                0912 123 4567
              </a>

              {/* Booking button */}
              <Link
                href="/#booking"
                className="btn-primary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                رزرو نوبت
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              type="button"
              aria-label="باز کردن منو"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden"
            >
              <div className="flex w-6 flex-col gap-1.5">
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 45, y: 8, backgroundColor: "var(--primary)" }
                      : { rotate: 0, y: 0, backgroundColor: "#000000" }
                  }
                  className="block h-px w-full"
                />

                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px w-full bg-black"
                />

                <motion.span
                  animate={
                    isOpen
                      ? { rotate: -45, y: -8, backgroundColor: "var(--primary)" }
                      : { rotate: 0, y: 0, backgroundColor: "#000000" }
                  }
                  className="block h-px w-full"
                />
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain bg-white lg:hidden"
              >
                <div className="flex flex-col px-6 py-6">
                  {navItems.map((item, index) => {
                    const active = isActivePath(pathname, item.href);

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex items-center justify-between border-b border-black/10 py-4 text-base font-medium transition-colors hover:text-[var(--primary)] ${
                            active
                              ? "text-[var(--primary)]"
                              : "text-[#171512]"
                          }`}
                        >
                          {item.title}
                          <span
                            className={`transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[var(--primary)] ${
                              active ? "text-[var(--primary)]" : "text-black/20"
                            }`}
                          >
                            ←
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  <a
                    href="tel:+989121234567"
                    dir="ltr"
                    className="mt-5 flex items-center justify-center gap-2 rounded-full border border-[var(--primary)]/30 py-3.5 text-sm font-medium text-[var(--primary)]"
                  >
                    0912 123 4567
                  </a>

                  <Link
                    href="/#booking"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary mt-3 rounded-full py-4 text-center text-sm font-medium text-white"
                  >
                    رزرو نوبت
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </motion.div>
    </>
  );
}