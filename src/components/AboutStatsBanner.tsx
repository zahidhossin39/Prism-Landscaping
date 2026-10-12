"use client";

import React from "react";

export interface StatItem {
  value: string;
  label: string;
}

interface AboutStatsBannerProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { value: "820+", label: "Satisfied Clients" },
  { value: "180+", label: "Commercial Projects" },
  { value: "22+", label: "Awards & Recognitions" },
  { value: "100+", label: "Expert Gardeners" },
];

export default function AboutStatsBanner({ stats = defaultStats }: AboutStatsBannerProps) {
  return (
    <section className="w-full bg-[#f1efd9] py-10 sm:py-14 my-8 sm:my-12">
      <div className="max-w-[1204px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-[1007px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                idx !== 0 ? "lg:border-l lg:border-[#dedbc8] lg:pl-8 xl:pl-12" : ""
              }`}
            >
              <div className="text-4xl sm:text-5xl lg:text-[48px] font-sans font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-tight">
                {item.value}
              </div>
              <p className="text-xs sm:text-sm font-normal text-[#606060] mt-1.5 sm:mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
