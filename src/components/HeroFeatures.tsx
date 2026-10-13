"use client";

import React from "react";
import { UserCheck, Sparkles, Headphones } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Skilled Gardeners",
    description:
      "Our expert gardeners use their skills to bring your dream garden to life, beautifully today.",
  },
  {
    icon: Sparkles,
    title: "Eco-Friendly Tools",
    description:
      "We use eco-friendly tools and sustainable methods to care for your garden.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our customer support team is available 24/7 to answer methods any questions.",
  },
];

export default function HeroFeatures() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-[80px] border-b border-[#e2dec9]">
      <div className="max-w-[1610px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dedbc8]">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="py-6 md:py-0 px-4 sm:px-8 text-center flex flex-col items-center group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#bedd25] flex items-center justify-center text-[#1f1f1f] shadow-sm mb-4 transition-transform group-hover:scale-105">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1f1f1f] mb-2 font-serif">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#606060] leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
