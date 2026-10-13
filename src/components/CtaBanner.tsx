"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CtaBannerProps {
  onOpenQuote: () => void;
  title?: string;
  titleSecondLine?: string;
  highlight?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  showArrow?: boolean;
}

export default function CtaBanner({
  onOpenQuote,
  title = "Transform Your",
  titleSecondLine = "Garden",
  highlight = "with Experts",
  subtitle = "Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision.",
  buttonText = "Get A Free Quote",
  buttonHref = "/contact-us",
  showArrow = false,
}: CtaBannerProps) {
  // If highlight starts with "Garden", split cleanly so "Garden" is white sans-serif and "with Experts" is green italic
  let resolvedSecondLine = titleSecondLine;
  let resolvedHighlight = highlight;

  if (highlight.startsWith("Garden ")) {
    resolvedSecondLine = "Garden";
    resolvedHighlight = highlight.replace(/^Garden\s+/, "");
  }

  return (
    <section className="w-full bg-[#274839] text-white mt-16 sm:mt-24 relative overflow-hidden">
      {/* Background Gardener Image (placed at bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-[65%] sm:h-[75%] lg:h-[80%] z-0 pointer-events-none">
        <Image
          src="/assets/cta-gardener.png"
          alt="Expert gardener ready for service"
          fill
          priority={false}
          className="object-cover object-[68.2%_38.8%]"
        />
      </div>

      {/* Diagonal Curve Shape Overlay on Desktop (Framer: h-483px top-0) */}
      <div className="absolute top-0 left-0 w-full h-[483px] z-[1] pointer-events-none hidden lg:block">
        <Image
          src="/assets/cta-shape.png"
          alt="CTA Mask Shape"
          fill
          priority={false}
          className="object-cover object-center"
        />
      </div>

      {/* On Mobile & Tablet (< lg): Semi-transparent dark green overlay ensuring text legibility */}
      <div className="absolute inset-0 z-[1] bg-[#274839]/85 sm:bg-[#274839]/80 lg:hidden pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1610px] mx-auto px-4 sm:px-8 lg:px-[80px] pt-16 sm:pt-20 lg:pt-28 pb-48 sm:pb-64 lg:pb-[380px]">
        <div className="max-w-[440px] space-y-5 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[1.2] tracking-[-1.5px] lg:tracking-[-2px]">
            {title}{" "}
            <span className="block">
              {resolvedSecondLine}{" "}
              <span className="font-serif italic font-normal text-[#bedd25]">
                {resolvedHighlight}
              </span>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-[380px]">
            {subtitle}
          </p>

          <div className="pt-2">
            {buttonHref ? (
              <Link
                href={buttonHref}
                className="inline-flex items-center gap-2.5 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] text-sm sm:text-base font-semibold transition-all duration-200 group shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>{buttonText}</span>
                {showArrow && (
                  <span className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </Link>
            ) : (
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] text-sm sm:text-base font-semibold transition-all duration-200 group shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>{buttonText}</span>
                {showArrow && (
                  <span className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
