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
      className="overflow-hidden bg-[#171512] py-16 text-white lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
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
                  ۰۹۱۲ ۱۲۳ ۴۵۶۷
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
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative rounded-sm border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6 lg:p-7"
          >
            {/* Form Header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[11px] text-white/25">
                STEP 01 — 04
              </span>

              <span className="text-[11px] tracking-[0.15em] text-white/35">
                YOUR DETAILS
              </span>
            </div>

            <div className="space-y-4">

              {/* Name + Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-right text-[11px] text-white/40"
                  >
                    نام و نام خانوادگی
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="نام خود را وارد کنید"
                    className="w-full border-b border-white/15 bg-transparent px-0 py-2 text-right text-[13px] outline-none transition-colors placeholder:text-white/20 focus:border-[var(--primary)]"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-right text-[11px] text-white/40"
                  >
                    شماره تماس
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
                    className="w-full border-b border-white/15 bg-transparent px-0 py-2 text-right text-[13px] outline-none transition-colors placeholder:text-white/20 focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <span className="mb-2 block text-right text-[11px] text-white/40">
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
                        className={`rounded-full border px-3 py-2 text-[11px] transition-all duration-300 ${
                          active
                            ? "btn-primary border-transparent text-white"
                            : "border-white/15 text-white/55 hover:border-[var(--primary)]/50 hover:text-[var(--primary-light)]"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date + Message */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-right text-[11px] text-white/40"
                  >
                    تاریخ پیشنهادی
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="w-full border-b border-white/15 bg-transparent px-0 py-2 text-right text-[13px] outline-none transition-colors [color-scheme:dark] focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-right text-[11px] text-white/40"
                  >
                    توضیحات
                  </label>

                  <input
                    id="message"
                    name="message"
                    type="text"
                    placeholder="توضیح کوتاه..."
                    className="w-full border-b border-white/15 bg-transparent px-0 py-2 text-right text-[13px] outline-none transition-colors placeholder:text-white/20 focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full py-3.5 text-[13px] font-medium text-white ${
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
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}