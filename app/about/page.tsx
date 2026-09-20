import AboutGallery from "@/components/About/AboutPage/AboutGallery";
import AboutIntro from "@/components/About/AboutPage/AboutIntro";
import type { Metadata } from "next";


// Server component on purpose (no client directive): every heading and
// paragraph is rendered into the initial HTML that Google indexes.

export const metadata: Metadata = {
  title: "درباره ما | آتلیه بختیاری",
  description:
    "آشنایی با آتلیه بختیاری؛ داستان ما، نگاه ما به عکاسی و فضای آتلیه. عکاسی کودک، خانواده و مراسم با نگاهی هنرمندانه و ماندگار.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره ما | آتلیه بختیاری",
    description:
      "آشنایی با آتلیه بختیاری؛ داستان ما، نگاه ما به عکاسی و فضای آتلیه.",
    type: "website",
    locale: "fa_IR",
    url: "/about",
    images: ["/images/slides/sample-1.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>

      <main className="bg-[#f5f2ec]">
        <AboutIntro />
        <AboutGallery />
      </main>
    </>
  );
}