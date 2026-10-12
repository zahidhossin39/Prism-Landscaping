"use client";

import React from "react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="w-full pt-[130px] sm:pt-[150px] lg:pt-[175px] pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            {/* Seedling / Leaf icon matching Framer */}
            <svg
              className="w-5 h-5 text-[#1f1f1f]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3" />
              <path d="M12 14a6 6 0 0 1 6-6h3v2a6 6 0 0 1-6 6h-3" />
              <path d="M12 22V10" />
            </svg>
            <span className="text-xs font-semibold text-[#808080] tracking-widest uppercase">
              (01)
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-[1.12]">
            Our Greenly{" "}
            <span className="font-serif italic font-normal text-[#1f1f1f]">
              Journey
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#606060] leading-relaxed max-w-xl mx-auto">
            Our Greenly Journey Today reflects our commitment to creating healthier more beautiful outdoor spaces through expert care sustainable.
          </p>
        </div>

        {/* 2-Image Photo Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Card: Gardener pruning ornamental cloud tree */}
          <div className="group relative aspect-[4/3] sm:aspect-[4/3.1] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-[#dedbc8] bg-[#e5e3d7]">
            <Image
              src="/assets/about-hero-1.png"
              alt="Gardener pruning ornamental cloud tree with shears"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 580px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Right Card: Gardener trimming hedge + Floating 10+ Years card */}
          <div className="group relative aspect-[4/3] sm:aspect-[4/3.1] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-[#dedbc8] bg-[#e5e3d7]">
            <Image
              src="/assets/about-hero-2.png"
              alt="Gardener trimming garden hedge with shears"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 580px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating "10+ Years of Experience" mini card */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-white/80 flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03]">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-xs">
                <Image
                  src="/assets/about-flower.jpg"
                  alt="Blooming garden roses"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div className="pr-1 sm:pr-2">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#1f1f1f] leading-none tracking-tight">
                  10+
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-[#606060] mt-1 leading-tight whitespace-nowrap">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
