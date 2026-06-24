import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { TopNav } from "./_components/TopNav";
import { Footer } from "./_components/Footer";

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: { default: "STREET Retailer Guide", template: "%s · STREET Retailer Guide" },
  description: "How to set up, run and get the most out of your store on STREET.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={barlow.variable}>
      <body>
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
