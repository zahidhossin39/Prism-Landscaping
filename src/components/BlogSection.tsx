"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    title: "Transform Your Outdoors with Expert Advice",
    date: "Jan 10, 2026",
    image: "/assets/blog-1.png",
    category: "Lawn Care",
  },
  {
    title: "Revamp Your Garden with Seasonal Tips",
    date: "Jan 8, 2026",
    image: "/assets/blog-2.png",
    category: "Seasonal Guide",
  },
  {
    title: "Maximize Your Space: Vertical Gardening Solutions",
    date: "Jan 19, 2026",
    image: "/assets/blog-3.png",
    category: "Landscape Design",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Green Living{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Our Blog
            </span>
          </h2>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, idx) => (
            <article
              key={idx}
              className="group cursor-pointer bg-[#ffffff] rounded-2xl overflow-hidden border border-[#e5e3d7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-106"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#274839] bg-[#bedd25]/25 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#808080]">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-medium text-[#1f1f1f] group-hover:text-[#274839] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>

                <div className="mt-5 pt-3 border-t border-[#f1efd9] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1f1f1f] group-hover:text-[#274839]">
                  <span>Read Article</span>
                  <div className="w-6 h-6 rounded-full bg-[#f1efd9] group-hover:bg-[#bedd25] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
