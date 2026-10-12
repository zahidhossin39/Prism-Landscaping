"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ServiceDetail } from "@/data/services";

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(service.title);

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedService(serviceName || service.title);
    setQuoteModalOpen(true);
  };

  // Split body sections around inline image (default at 5th section)
  const splitIndex = service.splitIndex ?? 5;
  const firstSections = service.sections.slice(0, splitIndex);
  const remainingSections = service.sections.slice(splitIndex);

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Hero Header Section */}
      <header className="w-full pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-6 sm:pb-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1204px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-[1.12]">
            {service.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#606060] leading-relaxed max-w-[360px] md:text-right">
            {service.subtitle}
          </p>
        </div>

        {/* Large Rounded Landscape Hero Photo */}
        <div className="max-w-[1204px] mx-auto mt-8 sm:mt-12">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[1204/540] rounded-[16px] sm:rounded-[22px] overflow-hidden shadow-sm bg-[#e5e3d7]">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 1204px) 100vw, 1204px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Centered Readable Content Column matching screenshot */}
      <article className="max-w-[760px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-12 sm:pb-16">
        {/* Bold Lead Paragraph */}
        <p className="text-lg sm:text-[22px] font-medium text-[#1f1f1f] leading-[1.4] tracking-[-0.3px] mb-8 sm:mb-10">
          {service.leadParagraph}
        </p>

        {/* First Group of Body Sections */}
        <div className="space-y-7 sm:space-y-8">
          {firstSections.map((sec, idx) => (
            <section key={idx} className="space-y-2">
              <h2 className="text-base sm:text-lg font-medium text-[#1f1f1f] tracking-[-0.2px]">
                {sec.heading}
              </h2>
              <p className="text-xs sm:text-sm text-[#606060] leading-[1.65]">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Inline Article Photo */}
        {service.inlineImage && (
          <div className="relative w-full aspect-[16/10] sm:aspect-[760/440] rounded-[12px] sm:rounded-[18px] overflow-hidden shadow-sm my-8 sm:my-10 bg-[#e5e3d7]">
            <Image
              src={service.inlineImage}
              alt={service.inlineImageAlt || `${service.title} showcase`}
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              className="object-cover"
            />
          </div>
        )}

        {/* Second Group of Body Sections */}
        <div className="space-y-7 sm:space-y-8">
          {remainingSections.map((sec, idx) => (
            <section key={idx + splitIndex} className="space-y-2">
              <h2 className="text-base sm:text-lg font-medium text-[#1f1f1f] tracking-[-0.2px]">
                {sec.heading}
              </h2>
              <p className="text-xs sm:text-sm text-[#606060] leading-[1.65]">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* "Book Your Service" CTA Button */}
        <div className="pt-6 sm:pt-8">
          <button
            onClick={() => handleOpenQuote(service.title)}
            className="inline-flex items-center justify-center bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            {service.ctaText || "Book Your Service"}
          </button>
        </div>
      </article>

      {/* Layered Dark Green CTA Banner */}
      <CtaBanner
        onOpenQuote={() => handleOpenQuote(service.title)}
        title="Transform Your"
        titleSecondLine="Garden"
        highlight="with Experts"
        subtitle="Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision."
        buttonText="Get A Free Quote"
      />

      {/* Dark Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}
