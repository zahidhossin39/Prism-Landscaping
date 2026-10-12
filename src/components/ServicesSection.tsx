"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServicesSectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

const services = [
  {
    title: "Shrub Trimming",
    image: "/assets/service-shrub.png",
    description:
      "Maintain a neat vibrant garden with our expert shrub trimming services. Schedule.",
  },
  {
    title: "Garden Maintenance",
    image: "/assets/service-garden.png",
    description:
      "With our full-service care you can keep garden lush lively and exquisitely arranged.",
  },
  {
    title: "Landscaping Design",
    image: "/assets/service-landscaping.png",
    description:
      "Elevate your property's appeal with Greenly premier landscaping design solutions. Reach.",
  },
];

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Our Expert Services{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Today
            </span>
          </h2>
        </div>

        {/* 3 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {services.map((srv, idx) => (
            <div
              key={idx}
              onClick={() => onOpenQuote(srv.title)}
              className="group cursor-pointer rounded-[28px] overflow-hidden relative aspect-[3/3.8] sm:aspect-[3/3.9] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-[#e2dec9]"
            >
              <Image
                src={srv.image}
                alt={srv.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle bottom shadow vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Pill overlay badge with arrow */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-black/45 backdrop-blur-md text-white py-2.5 px-5 rounded-full border border-white/20 transition-all duration-300 group-hover:bg-[#274839]/90 group-hover:border-white/40">
                <span className="text-sm sm:text-base font-medium tracking-wide">
                  {srv.title}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 sm:mt-14">
          <Link
            href="/service"
            className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-6 pr-3.5 py-3 rounded-full text-sm font-semibold transition-all duration-200 group shadow-sm hover:shadow hover:scale-[1.02]"
          >
            <span>Explore All Services</span>
            <span className="w-7 h-7 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
