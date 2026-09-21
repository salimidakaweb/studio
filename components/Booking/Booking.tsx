import Reveal from "@/components/Ui/Reveal";
import BookingForm from "./BookingForm";

// Server component: heading, intro copy and contact info are in the initial
// HTML. Client leaves: <Reveal /> and <BookingForm /> (needs state).

export default function Booking() {
  return (
    <section
      id="booking"
      className="overflow-hidden bg-[#171512] py-16 text-white lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12">
        {/* Intro */}
        <Reveal
          x={-40}
          y={0}
          className="flex flex-col justify-between text-right"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[var(--primary-light)]">
              <span className="h-px w-6 bg-[var(--primary)]" />
              BOOK A SESSION
            </span>

            <h2 className="mt-3 text-2xl font-light leading-[1.3] sm:text-3xl lg:text-4xl">
              لحظه‌ی شما،
              <span className="font-medium"> از همین‌جا شروع می‌شود.</span>
            </h2>

            <p className="mt-4 max-w-sm mr-auto text-[13px] leading-7 text-white/45">
              برای رزرو وقت یا دریافت اطلاعات بیشتر، فرم روبه‌رو را
              تکمیل کنید تا در اولین فرصت با شما تماس بگیریم.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-8 border-t border-white/10 pt-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-[9px] tracking-[0.2em] text-white/30">
                  PHONE
                </span>

                <p className="mt-1 text-[13px] text-white/70">
                  <a
                    href="tel:+989121234567"
                    className="transition-colors hover:text-[var(--primary-light)]"
                  >
                    ۰۹۱۲ ۱۲۳ ۴۵۶۷
                  </a>
                </p>
              </div>

              <div>
                <span className="text-[9px] tracking-[0.2em] text-white/30">
                  LOCATION
                </span>

                <p className="mt-1 text-[13px] text-white/70">
                  تهران، ایران
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal x={40} y={0} delay={0.15}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
