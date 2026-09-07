import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آتلیه بختیاری",
  description: "آتلیه تخصصی عکاسی کودک و ثبت لحظه‌های ماندگار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={playfair.variable}>
      <body>{children}</body>
    </html>
  );
}
