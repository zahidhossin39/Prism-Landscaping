"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function NotFoundClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");

  useEffect(() => {
    document.title = "404 - Page Not Found - Greenly";
  }, []);

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  return (
    <>
      <title>404 - Page Not Found - Greenly</title>
      <meta
        name="description"
        content="It seems the page you're looking for has been moved, removed, or doesn't exist. Don't worry—our garden is still growing."
      />
      <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] flex flex-col justify-between relative selection:bg-[#bedd25] selection:text-[#1f1f1f]">
        {/* Top Floating / Sticky Navbar */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* 404 Hero Section matching Framer .framer-53kd0j */}
        <section className="flex-1 flex flex-col items-center justify-center pt-[120px] md:pt-[120px] lg:pt-[203px] pb-[60px] md:pb-[80px] lg:pb-[150px] px-4 sm:px-8 lg:px-[80px] w-full">
          {/* Framer Container .framer-8hb6ua */}
          <div className="w-full max-w-[1610px] mx-auto flex flex-col items-center justify-center gap-5 sm:gap-[30px] lg:gap-[48px]">
            {/* Authentic 404 Moss & Grass 3D Artwork .framer-1ndbrr2 */}
            <div className="w-full max-w-[712px] aspect-[1424/776] relative flex items-center justify-center">
              <Image
                src="/assets/404-artwork.png"
                alt="404 Image"
                width={1424}
                height={776}
                priority
                sizes="(min-width: 1200px) 712px, (min-width: 768px) min(100vw - 60px, 712px), calc(100vw - 40px)"
                quality={95}
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>

            {/* Title & Button Container .framer-3qt5tz */}
            <div className="w-full max-w-[566px] mx-auto flex flex-col items-center text-center gap-4 sm:gap-[25px] lg:gap-[37px]">
              {/* Section Title .framer-1rmhfgw */}
              <div className="w-full flex flex-col items-center text-center gap-4">
                <h1 className="text-[38px] md:text-[52px] lg:text-[62px] font-medium text-[#1f1f1f] tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-2px] leading-[1.2] font-sans">
                  Sorry! Page not found
                </h1>

                <p className="text-[18px] text-[#606060] leading-[1.7] tracking-[0.1px] font-normal max-w-[566px]">
                  It seems the page you&apos;re looking for has been moved, removed, or doesn&apos;t exist. Don&apos;t worry—our garden is still growing.
                </p>
              </div>

              {/* Button Primary .framer-1y5ofea-container */}
              <div>
                <Link
                  href="/"
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-[8px] bg-[#bedd25] px-[21px] py-[8px] text-[16px] font-medium text-[#1f1f1f] tracking-[-0.2px] leading-[1.56] shadow-xs transition-all duration-300 hover:bg-[#b0d11f] active:scale-[0.98] group cursor-pointer"
                >
                  <span className="relative z-10">Go Back To Home</span>
                  {/* Framer signature light sheen sweep overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer onOpenQuote={handleOpenQuote} />

        {/* Quote Modal */}
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          defaultService={selectedService}
        />
      </main>
    </>
  );
}
