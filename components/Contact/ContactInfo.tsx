import type { ReactNode } from "react";
import Reveal from "../Ui/Reveal";
import HoverLift from "../Ui/HoverLift";

/* ------------------------------------------------------------------ */
/*  Editable content — change everything you need right here          */
/* ------------------------------------------------------------------ */

const about = {
  eyebrow: "CONTACT",
  title: "همیشه در",
  highlight: "دسترس شما هستیم.",
  paragraphs: [
    "آتلیه بختیاری با سال‌ها تجربه در عکاسی کودک، خانواده و مراسم، تلاش می‌کند لحظه‌های خاص شما را با نگاهی هنرمندانه و ماندگار ثبت کند.",
    "تیم ما با فضایی آرام و صمیمی همراه شماست تا نتیجه‌ای بگیرید که سال‌ها به دیدنش لبخند بزنید. برای مشاوره، رزرو وقت یا هر سؤالی، از راه‌های زیر با ما در تماس باشید.",
  ],
};

const phones = [
  { label: "تلفن ثابت", display: "۰۲۱ ۱۲۳۴ ۵۶۷۸", href: "tel:+982112345678" },
  { label: "موبایل", display: "۰۹۱۲ ۱۲۳ ۴۵۶۷", href: "tel:+989121234567" },
  { label: "واتساپ", display: "۰۹۱۲ ۱۲۳ ۴۵۶۷", href: "https://wa.me/989121234567" },
];

const addresses = [
  {
    label: "آتلیه مرکزی",
    text: "تهران، خیابان ولیعصر، نبش کوچه نمونه، پلاک ۱۲، طبقه دوم",
  },
  {
    label: "شعبه شرق",
    text: "تهران، خیابان فرجام، ابتدای بلوار نمونه، پلاک ۴۵",
  },
];

const emails = [
  { label: "ارتباط عمومی", address: "hello@atelier-bakhtiari.ir" },
  { label: "رزرو و همکاری", address: "booking@atelier-bakhtiari.ir" },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com/" },
  { name: "Telegram", href: "https://t.me/" },
  { name: "WhatsApp", href: "https://wa.me/989121234567" },
  { name: "Aparat", href: "https://aparat.com/" },
];

const workingHours = "هر روز ۹ صبح تا ۸ شب، با تعیین وقت قبلی";

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

const icons = {
  phone: (
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
    </>
  ),
} as const;

function Block({
  icon,
  title,
  index,
  children,
}: {
  icon: keyof typeof icons;
  title: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <Reveal
      delay={index * 0.08}
      className="border-t border-black/10 pt-5 text-right"
    >
      <div className="mb-4 flex items-center justify-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--primary)]/30 text-[var(--primary)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={icon === "phone" ? "currentColor" : "none"}
            stroke={icon === "phone" ? "none" : "currentColor"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {icons[icon]}
          </svg>
        </span>

        <h3 className="text-sm font-medium text-[#171512]">{title}</h3>
      </div>

      {children}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-16">
      {/* Ambient accent, same language as the other sections */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-[300px] w-[300px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "var(--primary)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-12">
        {/* Intro */}
        <Reveal className="mb-10 text-right">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-dark)]">
            <span className="h-px w-6 bg-[var(--primary)]" />
            {about.eyebrow}
          </span>

          <h1 className="mt-3 text-3xl font-light leading-tight text-[#171512] sm:text-4xl lg:text-5xl">
            {about.title}
            <span className="font-medium"> {about.highlight}</span>
          </h1>

          <div className="mt-5 max-w-2xl space-y-3 text-[13px] leading-7 text-black/55 sm:text-sm sm:leading-8">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Info blocks */}
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {/* Phones */}
          <Block icon="phone" title="شماره‌های تماس" index={0}>
            <ul className="space-y-2.5">
              {phones.map((phone) => (
                <li
                  key={phone.label}
                  className="flex items-center justify-between gap-4 text-[13px]"
                >
                  <span className="text-black/40">{phone.label}</span>
                  <a
                    href={phone.href}
                    dir="ltr"
                    className="text-[#171512] transition-colors duration-300 hover:text-[var(--primary)]"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          {/* Emails */}
          <Block icon="mail" title="ایمیل" index={1}>
            <ul className="space-y-2.5">
              {emails.map((email) => (
                <li
                  key={email.address}
                  className="flex items-center justify-between gap-4 text-[13px]"
                >
                  <span className="shrink-0 text-black/40">{email.label}</span>
                  <a
                    href={`mailto:${email.address}`}
                    dir="ltr"
                    className="truncate text-[#171512] transition-colors duration-300 hover:text-[var(--primary)]"
                  >
                    {email.address}
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          {/* Addresses */}
          <Block icon="pin" title="آدرس" index={2}>
            <ul className="space-y-3">
              {addresses.map((address) => (
                <li key={address.label} className="text-[13px] leading-7">
                  <span className="ml-2 text-[var(--primary-dark)]">
                    {address.label}:
                  </span>
                  <span className="text-black/60">{address.text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-[11px] text-black/35">{workingHours}</p>
          </Block>

          {/* Socials */}
          <Block icon="share" title="شبکه‌های اجتماعی" index={3}>
            <div className="flex flex-wrap justify-start gap-2">
              {socials.map((social) => (
                <HoverLift
                  key={social.name}
                  href={social.href}
                  external
                  className="rounded-full border border-black/15 px-4 py-2 text-[11px] tracking-[0.08em] text-black/55 transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary-dark)]"
                >
                  {social.name}
                </HoverLift>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </section>
  );
}