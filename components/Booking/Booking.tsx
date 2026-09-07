"use client";

import { motion } from "motion/react";
import { useState } from "react";

const services = [
  "عکاسی عروسی",
  "فیلم‌برداری",
  "عکاسی کودک",
  "عکاسی پرتره",
  "فرمالیته",
];

export default function Booking() {
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="booking"
      className="overflow-hidden bg-[#f5f2ec] py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col justify-between text-right"
        >
          <div>
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-dark)]">
              <span className="h-px w-8 bg-[var(--primary)]" />
              BOOK A SESSION
            </span>

            <h2 className="mt-5 text-5xl font-light leading-[1.15] text-[#171512] sm:text-6xl lg:text-7xl">
              لحظه‌ی شما،
              <br />
              <span className="font-medium">
                از همین‌جا شروع می‌شود.
              </span>
            </h2>

            <p className="mt-8 max-w-md mr-auto text-sm leading-8 text-black/50">
              برای رزرو وقت یا دریافت اطلاعات بیشتر،
              فرم روبه‌رو را تکمیل کنید.
              کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-14 border-t border-black/10 pt-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-black/35">
                  PHONE
                </span>

                <p className="mt-2 text-sm text-black/70">
                  ۰۹۱۲ ۱۲۳ ۴۵۶۷
                </p>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] text-black/35">
                  LOCATION
                </span>

                <p className="mt-2 text-sm text-black/70">
                  تهران، ایران
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative border border-black/10 bg-white/60 p-7 shadow-[0_30px_70px_-30px_rgba(20,18,15,0.25)] backdrop-blur-sm sm:p-9 lg:p-12"
          >
            {/* Form Header */}
            <div className="mb-10 flex items-center justify-between border-b border-black/10 pb-6">
              <span className="text-xs text-black/30">
                STEP 01 — 04
              </span>

              <span className="text-xs tracking-[0.2em] text-black/40">
                YOUR DETAILS
              </span>
            </div>

            <div className="space-y-8">

              {/* Name */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="mb-3 block text-right text-xs text-black/45"
                >
                  نام و نام خانوادگی
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="نام خود را وارد کنید"
                  className="w-full border-b border-black/15 bg-transparent px-0 py-3 text-right text-sm outline-none transition-colors placeholder:text-black/20 focus:border-[var(--primary)]"
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-right text-xs text-black/45"
                >
                  شماره تماس
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
                  className="w-full border-b border-black/15 bg-transparent px-0 py-3 text-right text-sm outline-none transition-colors placeholder:text-black/20 focus:border-[var(--primary)]"
                />
              </div>

              {/* Service */}
              <div>
                <span className="mb-4 block text-right text-xs text-black/45">
                  نوع خدمات
                </span>

                <div className="flex flex-wrap justify-end gap-2">
                  {services.map((service) => {
                    const active = selectedService === service;

                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`rounded-full border px-4 py-3 text-xs transition-all duration-300 ${
                          active
                            ? "btn-primary border-transparent text-white"
                            : "border-black/10 text-black/55 hover:border-[var(--primary)]/50 hover:text-[var(--primary-dark)]"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="mb-3 block text-right text-xs text-black/45"
                >
                  تاریخ پیشنهادی
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  className="w-full border-b border-black/15 bg-transparent px-0 py-3 text-right text-sm outline-none transition-colors focus:border-[var(--primary)]"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-right text-xs text-black/45"
                >
                  توضیحات
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="کمی درباره مراسم یا درخواست خود بنویسید..."
                  className="w-full resize-none border-b border-black/15 bg-transparent px-0 py-3 text-right text-sm leading-7 outline-none transition-colors placeholder:text-black/20 focus:border-[var(--primary)]"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-full py-5 text-sm font-medium text-white ${
                  submitted ? "!bg-emerald-600 shadow-none" : ""
                }`}
              >
                <span className="relative z-10">
                  {submitted
                    ? "درخواست شما ثبت شد ✓"
                    : "ارسال درخواست رزرو"}
                </span>

                {!submitted && (
                  <span className="relative z-10 transition-all duration-300 group-hover:-translate-x-2">
                    ←
                  </span>
                )}
              </motion.button>

              <p className="text-center text-[10px] leading-6 text-black/30">
                با ارسال فرم، کارشناسان آتلیه برای هماهنگی
                با شما تماس خواهند گرفت.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}