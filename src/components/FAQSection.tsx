"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

interface FAQSectionProps {
  onOpenQuote: () => void;
}

const faqs = [
  {
    question: "How often should I schedule lawn maintenance?",
    answer:
      "It depends on your lawn type and needs but generally weekly or bi-weekly maintenance keeps your outdoor space healthy looking its best.",
  },
  {
    question: "What are the benefits of aerating my lawn?",
    answer:
      "Aeration improves soil drainage, encourages deep root growth, and helps nutrients and oxygen penetrate deep into the root zone for lush, resilient grass.",
  },
  {
    question: "When is the best time to fertilize my lawn?",
    answer:
      "Early spring and autumn are ideal times to fertilize, supplying essential nutrients during peak growing cycles for vigorous seasonal health.",
  },
  {
    question: "How can I control weeds in my lawn?",
    answer:
      "We combine organic and targeted pre-emergent treatments with proper mowing height and overseeding to naturally outcompete invasive weeds.",
  },
  {
    question: "What type of grass is best for my climate?",
    answer:
      "Our certified team inspects local climate, sunlight exposure, and soil composition to recommend optimal cool-season or warm-season turf blends.",
  },
];

export default function FAQSection({ onOpenQuote }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Frequently Asked{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Questions
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#606060]">
            Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision.
          </p>
        </div>

        {/* 2 Columns: Help Box + Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Have Any Question box */}
          <div className="lg:col-span-4 bg-[#f1efd9] rounded-2xl p-7 sm:p-8 border border-[#e2dec9] space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif text-[#1f1f1f]">
              Have Any Question Here?
            </h3>
            <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
              Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-5 pr-3 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 group shadow-sm hover:shadow"
              >
                <span>Contact Us</span>
                <span className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Right: Accordion Items */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "bg-[#f6f5ea] border-[#dedbc8] shadow-xs"
                      : "bg-[#ffffff] border-[#e5e3d7] hover:border-[#dedbc8]"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4 sm:py-5 px-6 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-[#1f1f1f] hover:text-[#274839] transition-colors"
                  >
                    <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center transition-all ${
                        isOpen ? "bg-[#bedd25] text-[#1f1f1f]" : "bg-[#f1efd9] text-[#606060]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#606060] leading-relaxed border-t border-[#dedbc8]/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
