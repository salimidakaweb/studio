import Link from "next/link";
import Reveal from "@/components/Ui/Reveal";
import { AmbientGlow, GiantBrand, MagneticText } from "./FooterClient";
import HoverLift from "../Ui/HoverLift";

const footerLinks = [
  { title: "خانه", href: "/" },
  { title: "آتلیه کودک", href: "/kids" },
  { title: "آتلیه عروسی", href: "/wedding" },
  { title: "گالری", href: "/gallery" },
  { title: "وبلاگ", href: "/blog" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com/" },
  { name: "Telegram", href: "https://t.me/" },
  { name: "WhatsApp", href: "https://wa.me/989121234567" },
];

export default function Footer() {
  return (
    <footer className="relative flex min-h-[680px] flex-col overflow-hidden bg-[#0d0c0a] text-white">
      <AmbientGlow />

      {/* CTA */}
      <section className="relative border-b border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <Reveal
            y={30}
            className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-right"
          >
            <div>
              <span className="text-[10px] tracking-[0.4em] text-[var(--primary-light)]">
                LET&apos;S CREATE SOMETHING BEAUTIFUL
              </span>

              <h2 className="mt-3 text-3xl font-light leading-[1.2] sm:text-4xl lg:text-5xl">
                داستان شما،
                <span className="font-medium"> قاب ما.</span>
              </h2>
            </div>

            <MagneticText>
              <Link
                href="/contact"
                className="btn-primary group relative flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium text-white"
                style={{ willChange: "transform" }}
              >
                <span className="relative z-10">رزرو وقت</span>
                <span
                  aria-hidden="true"
                  className="relative z-10 text-base transition-transform duration-300 group-hover:-translate-x-1"
                >
                  ←
                </span>
              </Link>
            </MagneticText>
          </Reveal>
        </div>
      </section>

      {/* Main Footer */}
      <section className="relative flex-1 py-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            {/* Brand */}
            <Reveal x={-30} y={0} className="text-right">
              <Link
                href="/"
                className="inline-block text-xl font-medium tracking-tight"
              >
                آتلیه{" "}
                <span className="text-[var(--primary-light)]">بختیاری</span>
              </Link>

              <p className="mt-3 max-w-sm text-[13px] leading-6 text-white/40">
                روایت لحظه‌های خاص شما، با نگاهی متفاوت و ماندگار.
              </p>

              {/* Social: start-aligned so it hugs the right edge in RTL */}
              <div className="mt-5 flex flex-wrap justify-start gap-2">
                {socials.map((social) => (
                  <HoverLift
                    key={social.name}
                    href={social.href}
                    external
                    className="rounded-full border border-white/10 px-3 py-2 text-[9px] tracking-[0.1em] text-white/45 transition-colors duration-300 hover:border-[var(--primary)]/50 hover:text-[var(--primary-light)]"
                  >
                    {social.name}
                  </HoverLift>
                ))}
              </div>
            </Reveal>

            {/* Navigation */}
            <Reveal delay={0.1} className="text-right">
              <span className="text-[9px] tracking-[0.3em] text-white/25">
                NAVIGATION
              </span>

              <nav aria-label="ناوبری فوتر" className="mt-4 space-y-2.5">
                {footerLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex items-center justify-start gap-2 text-[13px] text-white/50 transition-colors duration-300 hover:text-[var(--primary-light)]"
                  >
                    {link.title}

                    <span
                      aria-hidden="true"
                      className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      ←
                    </span>
                  </Link>
                ))}
              </nav>
            </Reveal>

            {/* Contact */}
            <Reveal delay={0.2} className="text-right">
              <span className="text-[9px] tracking-[0.3em] text-white/25">
                CONTACT
              </span>

              <address className="mt-4 space-y-2.5 text-[13px] not-italic text-white/50">
                <a
                  href="tel:+989121234567"
                  className="block transition-colors hover:text-[var(--primary-light)]"
                >
                  ۰۹۱۲ ۱۲۳ ۴۵۶۷
                </a>

                <a
                  href="mailto:hello@atelier-bakhtiari.ir"
                  className="block transition-colors hover:text-[var(--primary-light)]"
                >
                  hello@atelier-bakhtiari.ir
                </a>

                <p className="leading-6">
                  تهران، ایران
                  <br />
                  با تعیین وقت قبلی
                </p>
              </address>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Giant Brand */}
      <section
        aria-hidden="true"
        className="relative overflow-hidden border-t border-white/10 py-4"
      >
        <GiantBrand>BAKHTIARI</GiantBrand>
      </section>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>© 2026 ATELIER BAKHTIARI</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}