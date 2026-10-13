"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import BlogImage from "@/components/BlogImage";
import { BlogPost } from "@/data/blogs";

interface BlogIndexClientProps {
  featuredPost: BlogPost;
  recentPosts: BlogPost[];
}

export default function BlogIndexClient({
  featuredPost,
  recentPosts,
}: BlogIndexClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");
  const [visibleCount, setVisibleCount] = useState(6);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  const handleReadMoreClick = () => {
    if (visibleCount < recentPosts.length) {
      setVisibleCount((prev) => prev + 6);
    } else {
      setToastMessage("All available blog articles are currently displayed.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const displayedPosts = recentPosts.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Container */}
      <div className="pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-[80px]">
        <div className="max-w-[1610px] mx-auto">
          {/* Page Heading matching Screenshot 1 */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-[62px] font-sans font-medium text-[#1f1f1f] tracking-[-1.5px] md:tracking-[-2px] leading-tight">
              Green Living{" "}
              <span className="font-serif italic font-medium text-[#1f1f1f]">
                Our Blog
              </span>
            </h1>
          </div>

          {/* Featured Hero Card */}
          {featuredPost && (
            <div className="bg-[#ffffff] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#e5e3d7] shadow-sm mb-16 sm:mb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Text Column */}
                <div className="flex flex-col justify-center order-2 md:order-1">
                  <div className="text-sm text-[#606060] font-normal mb-3 sm:mb-4">
                    {featuredPost.date}
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-sans font-medium text-[#1f1f1f] hover:text-[#274839] transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base text-[#606060] leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-block bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-5 py-2.5 rounded-[8px] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:scale-[1.02]"
                    >
                      Read More
                    </Link>
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="order-1 md:order-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="block relative aspect-[1.72] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-black/5"
                  >
                    <BlogImage
                      src={featuredPost.coverImage}
                      fallbackSrc={featuredPost.fallbackCoverImage}
                      alt={featuredPost.title}
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Recent Our Blog Posts Section */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-[48px] font-sans text-[#1f1f1f] tracking-[-1px] md:tracking-[-1.5px] leading-tight font-normal mb-8 sm:mb-12">
              Recent Our{" "}
              <span className="font-serif italic font-medium text-[#1f1f1f]">
                Blog Posts
              </span>
            </h2>

            {/* 3-Column Responsive Grid matching Screenshot 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#ffffff] rounded-2xl p-6 border border-[#e5e3d7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  {/* Inner Rounded Image */}
                  <div className="relative aspect-[1.25] w-full rounded-lg overflow-hidden bg-black/5 mb-4 sm:mb-5">
                    <BlogImage
                      src={post.coverImage}
                      fallbackSrc={post.fallbackCoverImage}
                      alt={post.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date with line */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-5 h-[1px] bg-[#606060] inline-block" />
                        <span className="text-sm text-[#606060] font-normal">
                          {post.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-[20px] font-sans font-medium text-[#1f1f1f] group-hover:text-[#274839] transition-colors leading-[1.4] line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Centered Read More Button matching Screenshot 1 */}
            <div className="text-center mt-12 sm:mt-16 flex flex-col items-center gap-3">
              <button
                onClick={handleReadMoreClick}
                className="bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-7 py-2.5 rounded-[8px] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                Read More
              </button>
              {toastMessage && (
                <p className="text-xs text-[#606060] transition-opacity animate-in fade-in">
                  {toastMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <CtaBanner onOpenQuote={() => handleOpenQuote()} />

      {/* Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}
