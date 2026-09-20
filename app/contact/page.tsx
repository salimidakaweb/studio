import type { Metadata } from "next";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Location/Location";

export const metadata: Metadata = {
  title: "تماس با ما | آتلیه بختیاری",
  description:
    "راه‌های ارتباط با آتلیه بختیاری: شماره تماس، آدرس، ایمیل و شبکه‌های اجتماعی.",
};

export default function ContactPage() {
  return (
    <>
      <main className="bg-[#f5f2ec]">
        <ContactInfo />
        {/* Full-width map, flush under everything else */}
        <Location className="pb-5" />
      </main>
    </>
  );
}