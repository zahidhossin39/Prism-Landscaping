"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

interface OutdoorsBannerProps {
  onOpenQuote: () => void;
}

export default function OutdoorsBanner({ onOpenQuote }: OutdoorsBannerProps) {
  return (
    <section className="w-full bg-[#274839] text-white my-12 sm:my-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[520px]">
        {/* Left Column: Image */}
        <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full">
          <Image
            src="/assets/outdoors-banner.png"
            alt="Landscaper maintaining beautiful garden"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Copy & Checklist */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center space-y-6">
          <div className="max-w-xl space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.15] font-normal">
              Make Your Outdoors{" "}
              <span className="block font-serif italic font-semibold text-[#bedd25]">
                Beautiful, Naturally
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Our team uses sustainable methods quality tools and plant-friendly techniques to create vibrant lawns.
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#bedd25] flex items-center justify-center text-[#1f1f1f] flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base text-white/95 font-medium">
                  Free garden inspection consultation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#bedd25] flex items-center justify-center text-[#1f1f1f] flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base text-white/95 font-medium">
                  Eco-friendly tools safe treatments
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-6 pr-3.5 py-3 rounded-full text-sm font-semibold transition-all duration-200 group shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Book Your Service</span>
                <span className="w-7 h-7 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
