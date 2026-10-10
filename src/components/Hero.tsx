"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";

interface HeroProps {
  onOpenQuote: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenQuote, onOpenVideo }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-32 sm:pt-36 pb-20 sm:pb-28 min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex items-center">
      {/* Background Image across entire width */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.png"
          alt="Gardener trimming hedge"
          fill
          priority
          className="object-cover object-[center_right] md:object-center"
        />
        {/* Subtle cinematic gradient overlay to ensure text contrast while retaining lush nature greens */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent sm:from-black/70 sm:via-black/35" />
      </div>

      {/* Content Container aligned with site grid */}
      <div className="max-w-[1204px] mx-auto w-full px-4 sm:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* Left Column: Heading and CTA */}
        <div className="max-w-xl text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif leading-[1.08] tracking-tight font-normal">
            Transform Your Outdoor{" "}
            <span className="block font-serif italic font-semibold text-[#bedd25]">
              Space Effortlessly Today
            </span>
          </h1>

          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-lg leading-relaxed font-normal">
            Create a greener, more beautiful outdoor space with expert gardening and landscape design.
          </p>

          <div className="mt-8 sm:mt-10 flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-6 pr-3.5 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 group shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100"
            >
              <span>Book Your Service</span>
              <span className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Right Floating Video Card */}
        <div className="w-full sm:w-auto self-center md:self-end">
          <div
            onClick={onOpenVideo}
            className="group cursor-pointer bg-[#ffffff]/95 hover:bg-[#ffffff] backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/50 transition-all duration-300 hover:scale-105 max-w-[280px] sm:max-w-[310px]"
          >
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/20">
              <Image
                src="/assets/hero-video-thumb.png"
                alt="Greenly video preview"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Play Video button below thumbnail */}
            <div className="mt-2.5">
              <div className="w-full py-2 px-4 rounded-xl bg-[#bedd25] group-hover:bg-[#adce1e] text-[#1f1f1f] font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Video</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
