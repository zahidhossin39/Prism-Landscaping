"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export default function AboutSection({ onOpenQuote }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with rounded frame */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl border border-[#e2dec9] aspect-[4/4.4] sm:aspect-[4/4.2] max-w-[520px] mx-auto lg:max-w-none">
            <Image
              src="/assets/about-img.png"
              alt="Gardener tending to hedge"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column: Copy & Benefits */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-[1.15] font-normal">
              Dedicated to Keeping{" "}
              <span className="block font-serif italic font-semibold text-[#274839]">
                Green Spaces Beautiful
              </span>
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#606060] leading-relaxed max-w-xl">
              We are committed to creating and maintaining outdoor spaces that feel fresh vibrant and beautifully designed passion.
            </p>
          </div>

          {/* Features Checkpoints */}
          <div className="space-y-5 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#bedd25] flex-shrink-0 flex items-center justify-center text-[#1f1f1f] mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#1f1f1f]">
                  Quality You Can Trust
                </h4>
                <p className="text-xs sm:text-sm text-[#606060] mt-0.5">
                  Reliable service clear communication consistent results.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#bedd25] flex-shrink-0 flex items-center justify-center text-[#1f1f1f] mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#1f1f1f]">
                  Personalised Care
                </h4>
                <p className="text-xs sm:text-sm text-[#606060] mt-0.5">
                  Services tailored to your outdoor space and lifestyle.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-6 pr-3.5 py-3 rounded-full text-sm font-semibold transition-all duration-200 group shadow-sm hover:shadow"
            >
              <span>Discover Our Story</span>
              <span className="w-7 h-7 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
