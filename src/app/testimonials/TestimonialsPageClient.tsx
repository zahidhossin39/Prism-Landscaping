"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import VideoModal from "@/components/VideoModal";
import { Star, Play, CheckCircle2, ArrowUpRight, Quote } from "lucide-react";

interface CustomerReview {
  id: string;
  name: string;
  role: string;
  avatar: string;
  videoSrc?: string;
  rating: number;
  date: string;
  serviceTag: string;
  title: string;
  comment: string;
}

const detailedReviews: CustomerReview[] = [
  {
    id: "review-1",
    name: "Daniel K.",
    role: "Commercial Property Manager",
    avatar: "/assets/testimonial-1.png",
    videoSrc: "/assets/video-testimonial.mp4",
    rating: 5,
    date: "October 2026",
    serviceTag: "Commercial Landscaping",
    title: "Vibrant, healthy lawn and flawless punctuality",
    comment:
      "Absolutely outstanding service! Our commercial campus lawn has never looked this green and healthy. The team was professional, punctual, and paid attention to every detail. Our outdoor areas are now a vibrant, colorful paradise for our tenants and visitors.",
  },
  {
    id: "review-2",
    name: "Angela R.",
    role: "Asset Management Specialist",
    avatar: "/assets/testimonial-2.png",
    videoSrc: "/assets/video-testimonial.mp4",
    rating: 5,
    date: "September 2026",
    serviceTag: "Lawn Care & Mowing",
    title: "Envy of the entire neighbourhood",
    comment:
      "Incredible service from Greenly! Our lawn is truly the envy of the entire neighbourhood. The team is punctual, courteous, and delivers outstanding results every single time. I recommend their services to anyone seeking a dependable, expert lawn team.",
  },
  {
    id: "review-3",
    name: "Jessica P.",
    role: "Property Investment Advisor",
    avatar: "/assets/testimonial-3.png",
    videoSrc: "/assets/video-testimonial.mp4",
    rating: 5,
    date: "August 2026",
    serviceTag: "Garden Renovation",
    title: "Transformed our property value and curb appeal",
    comment:
      "Greenly transformed our investment property into a stunning landscape. Their team is professional, efficient, and genuinely cares about the details. I highly recommend their services to anyone looking for top-notch lawn care and landscaping design!",
  },
  {
    id: "review-4",
    name: "Marcus Vance",
    role: "Residential Homeowner",
    avatar: "/assets/team-1.png",
    rating: 5,
    date: "July 2026",
    serviceTag: "Shrub & Tree Trimming",
    title: "Artistic pruning and thorough cleanup",
    comment:
      "The precision with which Greenly handles shrub trimming and hedge shaping is second to none. They left our backyard spotless with zero debris left behind. Best lawn service we have hired in over 10 years.",
  },
  {
    id: "review-5",
    name: "Sophia Chen",
    role: "Landscape Architect",
    avatar: "/assets/team-2.png",
    rating: 5,
    date: "June 2026",
    serviceTag: "Irrigation & Soil Care",
    title: "Environmentally sustainable practices",
    comment:
      "As an architect, I hold landscape contractors to the highest standards. Greenly's approach to organic mulching, water-efficient drip irrigation, and soil balancing exceeded all my expectations. Exceptional craftsmanship.",
  },
  {
    id: "review-6",
    name: "David Miller",
    role: "Private Estate Owner",
    avatar: "/assets/team-3.jpg",
    rating: 5,
    date: "May 2026",
    serviceTag: "Seasonal Cleanups",
    title: "Seamless recurring service without hassle",
    comment:
      "Booking was effortless and the crew arrived right on time with professional gear. They revitalized our flower beds and aerated the turf before summer. Outstanding reliability and friendly communication.",
  },
];

export default function TestimonialsPageClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState("/assets/video-testimonial.mp4");
  const [activeVideoTitle, setActiveVideoTitle] = useState("Client Testimonial");

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

      {/* Hero Section */}
      <section className="w-full pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1204px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1efd9] border border-[#e5e3d7] text-xs font-semibold text-[#274839] mb-6">
            <CheckCircle2 className="w-4 h-4 text-[#bedd25]" />
            <span>Verified Customer Reviews</span>
          </div>

          <h1 className="text-[38px] sm:text-[48px] lg:text-[60px] font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-[1.15] max-w-3xl mx-auto">
            Trusted by 12k+{" "}
            <span className="font-serif italic font-normal text-[#274839]">
              Happy Customers
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#606060] leading-relaxed max-w-2xl mx-auto mt-5">
            Discover why property owners, homeowners, and estate managers across the region choose Greenly for exceptional lawn care and garden transformations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 bg-white rounded-2xl p-5 sm:p-6 border border-[#e5e3d7] shadow-sm">
            <div className="text-center border-r border-[#e8e6dc] last:border-r-0">
              <div className="text-2xl sm:text-3xl font-bold text-[#274839]">4.9 / 5</div>
              <div className="flex items-center justify-center gap-1 mt-1 text-[#ff7b00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#ff7b00]" />
                ))}
              </div>
              <div className="text-xs text-[#606060] mt-1">Average Rating</div>
            </div>

            <div className="text-center sm:border-r border-[#e8e6dc]">
              <div className="text-2xl sm:text-3xl font-bold text-[#274839]">12k+</div>
              <div className="text-xs text-[#606060] mt-2">Projects Completed</div>
            </div>

            <div className="text-center border-r border-[#e8e6dc] last:border-r-0">
              <div className="text-2xl sm:text-3xl font-bold text-[#274839]">99%</div>
              <div className="text-xs text-[#606060] mt-2">Satisfaction Rate</div>
            </div>

            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#274839]">10+ Yrs</div>
              <div className="text-xs text-[#606060] mt-2">Industry Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Spotlight */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1204px] mx-auto">
          <div className="bg-[#274839] text-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/20 group cursor-pointer"
                   onClick={() => handleOpenVideo("/assets/video-testimonial.mp4", "Client Video Story")}>
                <Image
                  src="/assets/testimonial-1.png"
                  alt="Customer video review"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#bedd25] group-hover:bg-[#adce1e] text-[#1f1f1f] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch Video Story</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-1 text-[#bedd25]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-snug">
                  “The best decision we made for our commercial property.”
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Hear directly from Daniel K. on how Greenly upgraded their lawn care program, introduced drought-tolerant turf management, and delivered flawless curb appeal week after week.
                </p>
                <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Daniel K.</h3>
                    <p className="text-xs text-white/70">Commercial Property Manager</p>
                  </div>
                  <button
                    onClick={() => handleOpenQuote()}
                    className="inline-flex items-center gap-2 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow cursor-pointer"
                  >
                    <span>Get A Free Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Card Reviews Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1204px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1f1f1f]">
              More Customer{" "}
              <span className="font-serif italic font-normal text-[#274839]">
                Stories
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#606060] mt-3">
              Read feedback from verified homeowners and estate managers who rely on our seasonal and recurring garden care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {detailedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5e3d7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#ff7b00]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ff7b00]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-[#274839] bg-[#f1efd9] px-2.5 py-1 rounded-full">
                      {rev.serviceTag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#1f1f1f] mb-2">
                    {rev.title}
                  </h3>

                  <p className="text-sm text-[#444444] leading-relaxed mb-6 font-normal">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f1efd9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#e5e3d7] border border-[#e2dec9]">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1f1f1f]">
                        {rev.name}
                      </h4>
                      <p className="text-[11px] text-[#606060]">{rev.role}</p>
                    </div>
                  </div>

                  {rev.videoSrc ? (
                    <button
                      onClick={() => handleOpenVideo(rev.videoSrc!, `Story from ${rev.name}`)}
                      className="w-8 h-8 rounded-full bg-[#f1efd9] hover:bg-[#bedd25] text-[#274839] flex items-center justify-center transition-colors cursor-pointer"
                      title="Watch video"
                      aria-label={`Watch video testimonial by ${rev.name}`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                  ) : (
                    <Quote className="w-5 h-5 text-[#274839]/30" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Carousel Section */}
      <TestimonialsSection
        onOpenVideo={handleOpenVideo}
        title={
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Highlighted Client{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Spotlights
            </span>
          </h2>
        }
      />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* CTA Banner */}
      <CtaBanner
        onOpenQuote={() => handleOpenQuote()}
        title="Transform Your"
        titleSecondLine="Garden"
        highlight="with Experts"
        subtitle="Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision."
        buttonText="Get A Free Quote"
        buttonHref="/contact-us"
      />

      {/* Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Modals */}
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
