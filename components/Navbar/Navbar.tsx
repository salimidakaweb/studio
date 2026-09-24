"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

type MegaKey = "kids" | "wedding";

const navItems: {
  title: string;
  href: string;
  mega?: MegaKey;
}[] = [
  { title: "خانه", href: "/" },
  { title: "آتلیه کودک", href: "/kids", mega: "kids" },
  { title: "آتلیه عروسی", href: "/wedding", mega: "wedding" },
  { title: "گالری", href: "/gallery" },
  { title: "وبلاگ", href: "/blog" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

// Sub-services shown in each mega menu (same slugs as data/services.ts).
const megaItems: Record<MegaKey, { title: string; href: string }[]> = {
  kids: [
    { title: "آتلیه تولد کودک", href: "/services/birthday" },
    { title: "آتلیه فضای باز کودک", href: "/services/outdoor-kids" },
    { title: "آتلیه بارداری", href: "/services/pregnancy" },
    { title: "آتلیه عکس در منزل کودک", href: "/services/home-kids" },
    { title: "آتلیه فانتزی کودک", href: "/services/fantasy-kids" },
  ],
  wedding: [
    { title: "آتلیه عروس و داماد", href: "/services/bride-groom" },
    { title: "آتلیه عقد", href: "/services/engagement-ceremony" },
    { title: "عکاسی فرمالیته", href: "/services/formality" },
    { title: "آتلیه بله‌برون", href: "/services/proposal" },
  ],
};

// Which category a pathname belongs to (drives the active state + booking link).
const wedding = new Set(megaItems.wedding.map((i) => i.href));

function categoryOf(pathname: string): MegaKey | null {
  if (pathname === "/kids" || pathname.startsWith("/kids/")) return "kids";
  if (pathname === "/wedding" || pathname.startsWith("/wedding/")) return "wedding";
  if (pathname.startsWith("/services/")) {
    return wedding.has(pathname) ? "wedding" : "kids";
  }
  return null;
}

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<MegaKey | null>(null);
  const [mobileMegaOpen, setMobileMegaOpen] = useState<MegaKey | null>(null);

  const category = categoryOf(pathname);
  // "Reserve" goes to the booking form of the page the visitor is on. On the
  // home page and other pages (which have no form) it goes to the kids form.
  const bookingHref = `/${category ?? "kids"}#booking`;

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
      {/* Spacer so page content doesn't jump under the fixed bar.
          Must match the header's real height (nav is h-20 = 80px) exactly,
          otherwise a visible gap appears between the header and the page content. */}
      <div className="h-20" />

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
                const active = item.mega
                  ? category === item.mega
                  : isActivePath(pathname, item.href);
                const isMegaOpen = item.mega ? megaOpen === item.mega : false;

                if (item.mega) {
                  const key = item.mega;
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setMegaOpen(key)}
                      onMouseLeave={() => setMegaOpen(null)}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        aria-expanded={isMegaOpen}
                        className={`group relative flex items-center py-2 text-sm font-medium transition-colors duration-300 ${
                          active || isMegaOpen
                            ? "text-[var(--primary)]"
                            : "text-black/70 hover:text-[var(--primary)]"
                        }`}
                      >
                        {item.title}

                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${
                            isMegaOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>

                        <span
                          className={`absolute -bottom-0.5 right-0 h-[2px] bg-[var(--primary)] transition-all duration-300 ease-out ${
                            active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>

                      {/* Mega menu panel */}
                      <AnimatePresence>
                        {isMegaOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute right-1/2 top-full z-50 w-72 translate-x-1/2 pt-4"
                          >
                            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_50px_-12px_rgba(20,18,15,0.25)]">
                              <div className="flex flex-col p-2">
                                {megaItems[key].map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="group/item flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#171512] transition-all duration-300 hover:bg-[var(--primary)] hover:text-white"
                                  >
                                    {child.title}
                                    <span className="text-black/20 transition-all duration-300 group-hover/item:-translate-x-1 group-hover/item:text-white">
                                      ←
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

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
            <div className="hidden items-center gap-1.5 lg:flex">
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
                href={bookingHref}
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
                    const active = item.mega
                      ? category === item.mega
                      : isActivePath(pathname, item.href);

                    if (item.mega) {
                      const key = item.mega;
                      const isOpenMobile = mobileMegaOpen === key;

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06, duration: 0.3 }}
                          className="border-b border-black/10"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setMobileMegaOpen(isOpenMobile ? null : key)
                            }
                            aria-expanded={isOpenMobile}
                            className={`flex w-full items-center justify-between py-4 text-base font-medium transition-colors ${
                              active || isOpenMobile
                                ? "text-[var(--primary)]"
                                : "text-[#171512]"
                            }`}
                          >
                            {item.title}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-transform duration-300 ${
                                isOpenMobile ? "rotate-180" : ""
                              }`}
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>

                          <AnimatePresence>
                            {isOpenMobile && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-1 pb-3">
                                  <Link
                                    href={item.href}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setMobileMegaOpen(null);
                                    }}
                                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-white"
                                  >
                                    {`صفحه ${item.title}`}
                                    <span aria-hidden="true">←</span>
                                  </Link>
                                  {megaItems[key].map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setMobileMegaOpen(null);
                                      }}
                                      className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-black/70 transition-all duration-300 hover:bg-[var(--primary)] hover:text-white"
                                    >
                                      {child.title}
                                      <span className="text-black/20 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-white">
                                        ←
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

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
                    href={bookingHref}
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