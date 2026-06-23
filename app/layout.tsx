import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Atmosphere from "@/components/Atmosphere";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tarun Madyal | Developer & Digital Builder",
  description:
    "MCA student at RVCE Bangalore, contributing at vSecure.ai. Building websites, digital experiences, and business solutions that create real impact.",
  keywords: ["Tarun Madyal", "Developer", "Portfolio", "RVCE", "vSecure.ai", "Web Development", "Bangalore"],
  authors: [{ name: "Tarun Madyal" }],
  openGraph: {
    title: "Tarun Madyal | Developer & Digital Builder",
    description:
      "MCA student at RVCE Bangalore, contributing at vSecure.ai. Building websites, digital experiences, and business solutions that create real impact.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ overflowX: "hidden" }}>
        {/* Prevent flash of wrong theme before React hydrates */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <ThemeProvider>
          <SmoothScroll />
          <Atmosphere />
          <ScrollProgress />
          <CustomCursor />
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
