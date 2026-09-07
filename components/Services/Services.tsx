"use client";

import { motion } from "motion/react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "عکاسی عروسی",
    description: "ثبت لحظه‌های خاص روزی که قرار است همیشه در خاطرتان بماند.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    href: "/services/wedding",
  },
  {
    number: "02",
    title: "فیلم‌برداری",
    description: "روایت سینمایی لحظه‌های شما با نگاهی متفاوت و ماندگار.",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop",
    href: "/services/filming",
  },
  {
    number: "03",
    title: "عکاسی کودک",
    description: "ثبت شیرین‌ترین لحظه‌های کودکی با فضایی صمیمی و خلاقانه.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    href: "/services/kids",
  },
  {
    number: "04",
    title: "عکاسی پرتره",
    description: "تصویری متفاوت از شما؛ ساده، حرفه‌ای و ماندگار.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    href: "/services/portrait",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#171512] py-24 text-white lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-right md:max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] text-[var(--primary-light)]">
              <span className="h-px w-8 bg-[var(--primary)]" />
              OUR SERVICES
            </span>

            <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              هر لحظه،
              <br />
              <span className="font-medium">یک روایت.</span>
            </h2>
          </div>

          <p className="max-w-sm text-right text-sm leading-7 text-white/50">
            از ثبت لحظه‌های عروسی تا پرتره و کودک؛
            ما داستان شما را با تصویر روایت می‌کنیم.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
            >
              <Link
                href={service.href}
                className="group relative block h-[420px] overflow-hidden"
              >
                {/* Image */}
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-all duration-500 group-hover:from-[var(--primary-dark)]/75" />

                {/* Bottom accent line */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] origin-right scale-x-0 bg-[var(--primary)] transition-transform duration-500 group-hover:scale-x-100" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-7 lg:p-9">

                  <div className="flex items-start justify-between">
                    <span className="text-xs tracking-[0.25em] text-white/60">
                      SERVICE
                    </span>

                    <span className="text-sm text-white/60">
                      {service.number}
                    </span>
                  </div>

                  <div className="text-right">
                    <h3 className="text-3xl font-medium sm:text-4xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-md mr-auto text-sm leading-7 text-white/70">
                      {service.description}
                    </p>

                    <div className="mt-6 flex items-center justify-end gap-3 text-sm transition-colors duration-300 group-hover:text-[var(--primary-light)]">
                      <span className="transition-transform duration-300 group-hover:-translate-x-2">
                        ←
                      </span>

                      <span>مشاهده خدمات</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}