import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

// TODO: put the real production domain here (or set NEXT_PUBLIC_SITE_URL).
// Without metadataBase, canonical / Open Graph URLs are not turned into absolute URLs.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelier-bakhtiari.ir";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "آتلیه بختیاری",
  description: "آتلیه تخصصی عکاسی کودک و ثبت لحظه‌های ماندگار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={playfair.variable}
      data-scroll-behavior="smooth">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
