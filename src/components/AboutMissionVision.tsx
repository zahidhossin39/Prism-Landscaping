"use client";

import React from "react";
import Image from "next/image";
import { Sprout, ShieldCheck } from "lucide-react";

export default function AboutMissionVision() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Gardener Photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-[#dedbc8] bg-[#e5e3d7]">
              <Image
                src="/assets/about-mission.png"
                alt="Gardener in red cap tending outdoor green space"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Statement & 2 Feature Highlight Boxes */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-3">
              <span className="inline-block text-xs font-semibold text-[#1f1f1f] tracking-wider uppercase px-3 py-1 rounded-full border border-[#dedbc8] bg-[#f1efd9]/50">
                (Our Mission)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#1f1f1f] leading-snug tracking-tight mb-8">
              We strive to deliver high-quality, sustainable gardening and lawn care services that enhance outdoor living and bring lasting beauty to every space we serve.
            </h2>

            {/* 2 Feature Boxes Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Box 1: What Drives Us */}
              <div className="bg-[#f1efd9] rounded-xl sm:rounded-2xl p-6 sm:p-7 border border-[#dedbc8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#bedd25] flex items-center justify-center text-[#1f1f1f] mb-4 shadow-xs">
                    <Sprout className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">
                    What Drives Us
                  </h3>
                  <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
                    Our passion for nature dedication to quality drive everything we do We believe every outdoor.
                  </p>
                </div>
              </div>

              {/* Box 2: Our Commitment */}
              <div className="bg-[#f1efd9] rounded-xl sm:rounded-2xl p-6 sm:p-7 border border-[#dedbc8] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#bedd25] flex items-center justify-center text-[#1f1f1f] mb-4 shadow-xs">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">
                    Our Commitment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
                    We are committed to delivering reliable, high-quality gardening and lawn care services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
