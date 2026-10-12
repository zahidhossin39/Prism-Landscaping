"use client";

import React, { useRef } from "react";
import { Play } from "lucide-react";

interface AboutVideoShowcaseProps {
  onOpenVideo: (src: string, title?: string) => void;
}

export default function AboutVideoShowcase({ onOpenVideo }: AboutVideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    onOpenVideo(
      "/assets/about-showcase.mp4",
      "Greenly - Dedicated to Beautiful Green Spaces"
    );
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Full-width Video Showcase Card */}
        <div
          onClick={handleClick}
          className="group cursor-pointer relative aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7.5] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg border border-[#dedbc8] bg-black/10"
        >
          {/* Background Showcase Video */}
          <video
            ref={videoRef}
            src="/assets/about-showcase.mp4"
            poster="/assets/about-video-cover.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />

          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />

          {/* Centered White Play Button matching Framer: rounded-lg/rounded-xl */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white text-[#1f1f1f] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#bedd25]">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
