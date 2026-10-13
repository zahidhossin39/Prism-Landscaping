"use client";

import React from "react";

const stats = [
  { value: "200+", label: "Lawns Maintained" },
  { value: "150+", label: "Landscaping Projects" },
  { value: "99%", label: "Customer Satisfaction" },
  { value: "500+", label: "Happy Customer" },
];

export default function StatsSection() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-[80px]">
      <div className="max-w-[1610px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Loved by Our Valued{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Clients
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#606060] leading-relaxed max-w-xl mx-auto">
            Our clients trust us to care for their gardens and lawns with dedication skill attentio detail. From routine maintenance landscaping.
          </p>
        </div>

        {/* Single Unified Stats Card */}
        <div className="bg-[#f1efd9] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#dedbc8] shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#dedbc8]/70">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="py-4 sm:py-2 px-3 sm:px-6 text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#1f1f1f] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#606060] mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
