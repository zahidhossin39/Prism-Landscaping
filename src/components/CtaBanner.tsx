"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CtaBannerProps {
  onOpenQuote: () => void;
}

export default function CtaBanner({ onOpenQuote }: CtaBannerProps) {
  return (
    <section className="w-full bg-[#274839] text-white mt-16 sm:mt-24 overflow-hidden">
      <div className="max-w-[1204px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[460px] lg:min-h-[520px]">
          {/* Left Side: Content */}
          <div className="lg:col-span-7 py-12 sm:py-16 lg:py-20 pr-0 lg:pr-8 space-y-6 z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif leading-[1.12] font-normal">
              Transform Your{" "}
              <span className="block font-serif italic font-semibold text-[#bedd25]">
                Garden with Experts
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-lg">
              Bring your garden to life with expert care and eco-friendly solutions. Our team of trained gardeners is ready to handle everything from routine maintenance.
            </p>

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

          {/* Right Side: Smiling Gardener Image with diagonal chamfer */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] overflow-hidden lg:[clip-path:polygon(18%_0%,100%_0%,100%_100%,0%_100%,0%_25%)]">
            <Image
              src="/assets/cta-gardener.png"
              alt="Expert gardener ready for service"
              fill
              className="object-cover object-top sm:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
