"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import AboutSection from "@/components/AboutSection";
import AboutStatsBanner from "@/components/AboutStatsBanner";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutVideoShowcase from "@/components/AboutVideoShowcase";
import AboutMissionVision from "@/components/AboutMissionVision";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutTeamSection from "@/components/AboutTeamSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import VideoModal from "@/components/VideoModal";

export default function AboutPageClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState("/assets/about-showcase.mp4");
  const [activeVideoTitle, setActiveVideoTitle] = useState("Greenly Video");

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  const handleOpenVideo = (src: string, title?: string) => {
    setActiveVideoSrc(src);
    if (title) setActiveVideoTitle(title);
    setVideoModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* Top Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* 1. Hero Section: "Our Greenly Journey" + Collage + 10+ Years Card */}
      <AboutHero />

      {/* 2. "Dedicated to Keeping Green Spaces Beautiful" Section */}
      <AboutSection onOpenQuote={() => handleOpenQuote()} />

      {/* 3. Metric Counters Banner: (820+, 180+, 22+, 100+) */}
      <AboutStatsBanner />

      {/* 4. Cascading Waterfall 4-Step Process */}
      <HowItWorksSection />

      {/* 5. Full-Width Video Showcase Section with Play Button */}
      <AboutVideoShowcase onOpenVideo={handleOpenVideo} />

      {/* 6. Mission / Vision Feature Split with Photo & Highlight Boxes */}
      <AboutMissionVision />

      {/* 7. "Trusted by 12k+ Weekly Customers" Testimonial Carousel */}
      <TestimonialsSection
        onOpenVideo={handleOpenVideo}
        title={
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Trusted by 12k+{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Weekly Customers
            </span>
          </h2>
        }
      />

      {/* 8. "Meet Our Expert Team" 4-Card Grid */}
      <AboutTeamSection />

      {/* 9. "Our Landscaping Gallery" Grid with "View All Gallery" Button */}
      <GallerySection
        onOpenQuote={() => handleOpenQuote()}
        buttonText="View All Gallery"
      />

      {/* 10. "Frequently Asked Questions" Accordion Section */}
      <FAQSection />

      {/* 11. Layered Dark Green CTA Banner ("Transform Your Garden with Experts") */}
      <CtaBanner
        onOpenQuote={() => handleOpenQuote()}
        title="Transform Your"
        titleSecondLine="Garden"
        highlight="with Experts"
        subtitle="Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision."
        buttonText="Get A Free Quote"
      />

      {/* 12. Site Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoSrc={activeVideoSrc}
        title={activeVideoTitle}
      />
    </main>
  );
}
