import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prism-landscaping.vercel.app"),
  title: "Greenly - Gardening Service Website",
  description: "Transform Your Outdoor Space Effortlessly Today. Professional gardening and landscaping services.",
  icons: {
    icon: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#1f1f1f] bg-[#f2f1e7] selection:bg-[#bedd25] selection:text-[#1f1f1f]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <ChatbotWidget />
      </body>
    </html>
  );
}
