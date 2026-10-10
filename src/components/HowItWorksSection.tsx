"use client";

import React from "react";
import Image from "next/image";

const steps = [
  {
    number: "(001)",
    title: "Receive a Quote",
    image: "/assets/step-1.png",
    description: "We provide a detailed estimate based on our inspection findings.",
    offsetClass: "lg:translate-y-0",
  },
  {
    number: "(002)",
    title: "Schedule the Service",
    image: "/assets/step-2.png",
    description: "Choose a convenient date and time for the service to be performed.",
    offsetClass: "lg:translate-y-10",
  },
  {
    number: "(003)",
    title: "Service Completion",
    image: "/assets/step-3.png",
    description: "Our team carries out the service with professionalism and care.",
    offsetClass: "lg:translate-y-20",
  },
  {
    number: "(004)",
    title: "Follow-Up Support",
    image: "/assets/step-4.png",
    description: "We offer after-service support ensure you're with the results.",
    offsetClass: "lg:translate-y-32",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="pt-16 sm:pt-24 pb-20 sm:pb-32 lg:pb-48 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between ${item.offsetClass} transition-transform duration-300`}
            >
              <div>
                <span className="text-xs font-semibold text-[#808080] tracking-wider block mb-2">
                  {item.number}
                </span>

                <h4 className="text-lg sm:text-xl font-serif font-semibold text-[#1f1f1f] mb-4">
                  {item.title}
                </h4>

                <div className="relative aspect-[4/3.8] w-full rounded-2xl overflow-hidden shadow-sm border border-[#e2dec9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#606060] leading-relaxed mt-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
