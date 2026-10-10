"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroFeatures from "@/components/HeroFeatures";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import OutdoorsBanner from "@/components/OutdoorsBanner";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState("/assets/video-hero.mp4");
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
      {/* Top Navigation */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Hero Section */}
      <Hero
        onOpenQuote={() => handleOpenQuote()}
        onOpenVideo={() =>
          handleOpenVideo(
            "/assets/video-hero.mp4",
            "Greenly - Transforming Outdoor Spaces"
          )
        }
      />

      {/* 3 Core Highlight Features */}
      <HeroFeatures />

      {/* Dedicated to Keeping Green Spaces Beautiful */}
      <AboutSection onOpenQuote={() => handleOpenQuote()} />

      {/* Our Expert Services Today */}
      <ServicesSection onOpenQuote={handleOpenQuote} />

      {/* Loved by Our Valued Clients */}
      <StatsSection />

      {/* Make Your Outdoors Beautiful, Naturally Banner */}
      <OutdoorsBanner onOpenQuote={() => handleOpenQuote()} />

      {/* 4-Step Process: How It Works */}
      <HowItWorksSection />

      {/* Trusted by 12k Happy Customers */}
      <TestimonialsSection onOpenVideo={handleOpenVideo} />

      {/* Our Landscaping Gallery */}
      <GallerySection onOpenQuote={() => handleOpenQuote()} />

      {/* Frequently Asked Questions */}
      <FAQSection onOpenQuote={() => handleOpenQuote()} />

      {/* Green Living Our Blog */}
      <BlogSection />

      {/* Transform Your Garden with Experts CTA Banner */}
      <CtaBanner onOpenQuote={() => handleOpenQuote()} />

      {/* Footer */}
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
