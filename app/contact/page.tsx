import type { Metadata } from "next";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Location/Location";
import ContactProcess from "@/components/Contact/Contactprocess";
import ContactFaq, { faqs } from "@/components/Contact/Contactfaq";

export const metadata: Metadata = {
  title: "تماس با ما | آتلیه بختیاری",
  description:
    "راه‌های ارتباط با آتلیه بختیاری: شماره تماس، آدرس، ایمیل و شبکه‌های اجتماعی.",
};

// FAQ structured data, built from the same list that is rendered on the page
// (so the markup and the visible text can never disagree).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function ContactPage() {
  return (
    <>
      <main className="bg-[#f5f2ec]">
        <ContactInfo />

        {/* Process + FAQ side by side on desktop, stacked on mobile */}
        <section className="pb-14 lg:pb-16">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <ContactProcess />
            <ContactFaq />
          </div>
        </section>

        {/* Full-width map, flush under everything else */}
        <Location className="pb-5" />
      </main>

      <script
        type="application/ld+json"
        // JSON.stringify output is safe here; "<" is escaped to avoid breaking out of the tag
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}