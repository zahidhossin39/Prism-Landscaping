"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialsSectionProps {
  onOpenVideo: (videoSrc: string, title: string) => void;
  title?: React.ReactNode;
}

const testimonials = [
  {
    name: "Daniel K.",
    role: "Commercial Property Manager",
    image: "/assets/testimonial-1.png",
    video: "/assets/video-testimonial.mp4",
    quote:
      "“Absolutely outstanding service! My lawn has never looked this green and healthy. The team was professional, punctual, and paid attention to every detail. My garden is now a vibrant, colorful paradise.”",
    rating: 5,
  },
  {
    name: "Angela R.",
    role: "Asset Management Specialist",
    image: "/assets/testimonial-2.png",
    video: "/assets/video-testimonial.mp4",
    quote:
      "“Incredible service from Greenly! Our lawn is the envy of the neighbourhood. The team is punctual, courteous, and delivers outstanding results every time. I recommend their services to anyone seeking a reliable lawn.”",
    rating: 5,
  },
  {
    name: "Jessica P.",
    role: "Property Investment Advisor",
    image: "/assets/testimonial-3.png",
    video: "/assets/video-testimonial.mp4",
    quote:
      "“Greenly transformed our property into a stunning landscape. Their team is professional, efficient, and truly cares about the details. I highly recommend their services to anyone looking for top-notch lawn care!”",
    rating: 5,
  },
];

export default function TestimonialsSection({
  onOpenVideo,
  title,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {title ? (
            title
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
              Trusted by 12k{" "}
              <span className="font-serif italic font-semibold text-[#274839]">
                Happy Customers
              </span>
            </h2>
          )}
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-[28px] sm:rounded-[36px] border border-[#e5e3d7] shadow-lg p-6 sm:p-10 md:p-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Left: Video / Portrait Card */}
            <div className="md:col-span-5">
              <div
                onClick={() => onOpenVideo(current.video, `Review by ${current.name}`)}
                className="group cursor-pointer relative aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-black/10 shadow-md border border-[#e5e3d7]"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/35">
                  <div className="w-12 h-12 rounded-full bg-[#bedd25] group-hover:bg-[#adce1e] text-[#1f1f1f] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Watch Video</span>
                </div>
              </div>
            </div>

            {/* Right: Review Details */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#ff7b00] fill-[#ff7b00]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg md:text-xl text-[#1f1f1f] leading-relaxed font-normal">
                {current.quote}
              </p>

              {/* Author */}
              <div className="pt-2 border-t border-[#f1efd9]">
                <h4 className="text-base sm:text-lg font-semibold text-[#1f1f1f]">
                  {current.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#606060]">
                  {current.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl bg-[#ffffff] hover:bg-[#f1efd9] text-[#1f1f1f] flex items-center justify-center border border-[#e2dec9] transition-all duration-200 active:scale-95 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="w-10 h-10 rounded-xl bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
