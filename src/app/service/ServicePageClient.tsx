"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const allServices: ServiceItem[] = [
  {
    id: "shrub-trimming",
    title: "Shrub Trimming",
    description:
      "Maintain a neat vibrant garden with our expert shrub trimming services. Schedule.",
    image: "/assets/service-card-shrub.png",
  },
  {
    id: "garden-maintenance",
    title: "Garden Maintenance",
    description:
      "With our full-service care you can keep garden lush lively and exquisitely arranged.",
    image: "/assets/service-card-garden.png",
  },
  {
    id: "landscaping-design",
    title: "Landscaping Design",
    description:
      "Elevate your property's appeal with Greenly premier landscaping design solutions. Reach.",
    image: "/assets/service-card-landscaping.png",
  },
  {
    id: "mulching",
    title: "Mulching",
    description:
      "Enhance moisture retention and suppress weeds in your garden beds premium.",
    image: "/assets/service-card-mulching.png",
  },
  {
    id: "irrigation-installation",
    title: "Irrigation Installation",
    description:
      "Optimise water usage and ensure your plants thrive with our efficient irrigation installation.",
    image: "/assets/service-card-irrigation.png",
  },
  {
    id: "soil-testing",
    title: "Soil Testing",
    description:
      "Ensure your plants get the right nutrients with our comprehensive soil testing and amendment.",
    image: "/assets/service-card-soil.png",
  },
  {
    id: "lawn-aeration",
    title: "Lawn Aeration",
    description:
      "Improve the health of your lawn by allowing air water and nutrients to penetrate.",
    image: "/assets/service-card-aeration.png",
  },
  {
    id: "seasonal-cleanup",
    title: "Seasonal Cleanup",
    description:
      "Prepare your garden for the changing seasons with our thorough seasonal cleanup services.",
    image: "/assets/service-card-cleanup.png",
  },
  {
    id: "pest-control",
    title: "Pest Control",
    description:
      "Protect your garden from harmful pests with our environmentally friendly pest control.",
    image: "/assets/service-card-pest.png",
  },
];

export default function ServicePageClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");
  const [showAllServices, setShowAllServices] = useState(false);

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  const displayedServices = showAllServices ? allServices : allServices.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* Top Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Hero Section: 3-image collage + Heading */}
      <section className="w-full pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 sm:pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1204px] mx-auto">
          {/* Desktop Layout (lg+) matching Framer 3-column collage */}
          <div className="hidden lg:flex items-end justify-between gap-6 lg:gap-8">
            {/* Left Hero Image */}
            <div className="relative w-[310px] aspect-[310/430] rounded-[10px] overflow-hidden shadow-sm flex-shrink-0">
              <Image
                src="/assets/service-hero-1.png"
                alt="Gardener trimming shrub with shears"
                fill
                priority
                sizes="310px"
                className="object-cover"
              />
            </div>

            {/* Center Column: Heading + Subtitle + Button + Wide Family Image */}
            <div className="flex-1 max-w-[479px] flex flex-col items-center text-center gap-10 lg:gap-14">
              <div className="space-y-4">
                <h1 className="text-[44px] sm:text-[52px] lg:text-[62px] font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-[1.15]">
                  Our{" "}
                  <span className="font-serif italic font-normal text-[#1f1f1f]">
                    Services
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[#606060] leading-relaxed max-w-[440px] mx-auto">
                  We provide comprehensive gardening and lawn care services designed to keep your outdoor spaces healthy.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleOpenQuote()}
                    className="inline-flex items-center justify-center bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] text-sm sm:text-base font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    Book Your Services
                  </button>
                </div>
              </div>

              <div className="relative w-full max-w-[420px] aspect-[840/600] rounded-[10px] overflow-hidden shadow-sm">
                <Image
                  src="/assets/service-hero-2.png"
                  alt="Family relaxing on well-maintained lawn"
                  fill
                  priority
                  sizes="420px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative w-[310px] aspect-[310/430] rounded-[10px] overflow-hidden shadow-sm flex-shrink-0">
              <Image
                src="/assets/service-hero-3.png"
                alt="Gardener mowing green lawn"
                fill
                priority
                sizes="310px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Tablet & Mobile Layout (< lg) */}
          <div className="lg:hidden flex flex-col items-center text-center gap-8">
            <div className="space-y-4 max-w-lg">
              <h1 className="text-4xl sm:text-5xl font-medium text-[#1f1f1f] tracking-[-1.5px] leading-[1.15]">
                Our{" "}
                <span className="font-serif italic font-normal text-[#1f1f1f]">
                  Services
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#606060] leading-relaxed">
                We provide comprehensive gardening and lawn care services designed to keep your outdoor spaces healthy.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleOpenQuote()}
                  className="inline-flex items-center justify-center bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  Book Your Services
                </button>
              </div>
            </div>

            {/* Center Family Image */}
            <div className="relative w-full max-w-md aspect-[840/600] rounded-[10px] overflow-hidden shadow-sm">
              <Image
                src="/assets/service-hero-2.png"
                alt="Family relaxing on well-maintained lawn"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />
            </div>

            {/* Left & Right Gardeners Side by Side */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="relative w-full aspect-[310/430] rounded-[10px] overflow-hidden shadow-sm">
                <Image
                  src="/assets/service-hero-1.png"
                  alt="Gardener trimming shrub with shears"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[310/430] rounded-[10px] overflow-hidden shadow-sm">
                <Image
                  src="/assets/service-hero-3.png"
                  alt="Gardener mowing green lawn"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Services Grid Section */}
      <section id="service" className="w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1204px] mx-auto">
          {/* Section Heading matching Framer left-aligned layout */}
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-[#1f1f1f] tracking-[-1px] sm:tracking-[-1.5px] lg:tracking-[-2px] leading-tight mb-8 sm:mb-12 text-left">
            Explore Our{" "}
            <span className="font-serif italic font-normal text-[#1f1f1f]">
              Services
            </span>
          </h2>

          {/* 6-Card (or 9 on expanded) Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleOpenQuote(service.title)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Container with Framer exact portrait aspect ratio (1552/1812) */}
                <div className="relative w-full aspect-[1552/1812] rounded-[12px] overflow-hidden bg-[#e5e3d7] shadow-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 388px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Content with Framer exact typography */}
                <div className="mt-5 space-y-2">
                  <h3 className="text-[22px] sm:text-[24px] font-medium text-[#1f1f1f] leading-[1.4] tracking-[-0.5px] group-hover:text-[#274839] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#606060] leading-[1.6]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button matching Framer rounded-10px */}
          <div className="mt-12 sm:mt-16 text-center">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="inline-flex items-center justify-center bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-8 py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              {showAllServices ? "View Less" : "Load More"}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner matching Framer service page design & screenshot */}
      <CtaBanner
        onOpenQuote={() => handleOpenQuote()}
        title="Transform Your"
        titleSecondLine="Garden"
        highlight="with Experts"
        subtitle="Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision."
        buttonText="Get A Free Quote"
        buttonHref="/contact-us"
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
