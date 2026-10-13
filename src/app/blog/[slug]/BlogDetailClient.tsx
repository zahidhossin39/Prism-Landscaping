"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import BlogImage from "@/components/BlogImage";
import { BlogPost } from "@/data/blogs";

interface BlogDetailClientProps {
  post: BlogPost;
  recommendedPosts: BlogPost[];
}

export default function BlogDetailClient({
  post,
  recommendedPosts,
}: BlogDetailClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  // Split sections around the inline image (default at 5th section)
  const splitIndex = post.splitIndex ?? 5;
  const firstSections = post.sections.slice(0, splitIndex);
  const remainingSections = post.sections.slice(splitIndex);

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Blog Article Container */}
      <article className="pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-[80px]">
        <div className="max-w-[1610px] mx-auto">
          {/* Header: Date + Title matching Screenshot 2 */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <span className="w-5 h-[1px] bg-[#606060] inline-block" />
              <span className="text-sm text-[#606060] font-normal">
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-sans font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-[1.2]">
              {post.title}
            </h1>
          </div>

          {/* Large Hero Cover Image matching Screenshot 2 */}
          <div className="max-w-[1000px] mx-auto relative aspect-[1.72] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#e5e3d7] mb-12 sm:mb-16 bg-black/5">
            <BlogImage
              src={post.detailHeroImage || post.coverImage}
              fallbackSrc={post.fallbackDetailHeroImage || post.fallbackCoverImage}
              alt={post.title}
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>

          {/* Article Text Content matching Screenshot 2 layout */}
          <div className="max-w-[834px] mx-auto">
            {/* First Set of Sections */}
            <div className="space-y-6 sm:space-y-7">
              {firstSections.map((sec, idx) => (
                <section key={idx}>
                  <h4 className="text-xl sm:text-2xl font-sans font-medium text-[#1f1f1f] tracking-[-0.5px] mb-3 leading-snug">
                    {sec.heading}
                  </h4>
                  <p className="text-base font-sans text-[#606060] leading-[1.5] mb-6 sm:mb-8">
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Inline Article Showcase Image */}
            {post.inlineImage && (
              <div className="relative aspect-[1.5] sm:aspect-[1.6] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm my-8 sm:my-12 border border-[#e5e3d7] bg-black/5">
                <BlogImage
                  src={post.inlineImage}
                  fallbackSrc={post.fallbackInlineImage}
                  alt={`${post.title} showcase`}
                  className="object-cover"
                  sizes="(max-width: 834px) 100vw, 834px"
                />
              </div>
            )}

            {/* Second Set of Sections */}
            <div className="space-y-6 sm:space-y-7">
              {remainingSections.map((sec, idx) => (
                <section key={idx + splitIndex}>
                  <h4 className="text-xl sm:text-2xl font-sans font-medium text-[#1f1f1f] tracking-[-0.5px] mb-3 leading-snug">
                    {sec.heading}
                  </h4>
                  <p className="text-base font-sans text-[#606060] leading-[1.5] mb-6 sm:mb-8">
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Back to Blog Button matching Screenshot 2 */}
            <div className="mt-8 sm:mt-10 mb-16 sm:mb-20">
              <Link
                href="/blog"
                className="inline-block bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:scale-[1.02]"
              >
                Back Your Blog
              </Link>
            </div>
          </div>

          {/* Recommended / Recent Posts Section matching Screenshot 2 */}
          {recommendedPosts.length > 0 && (
            <div className="mt-16 sm:mt-24 pt-12 border-t border-[#e5e3d7]">
              <h2 className="text-2xl sm:text-3xl md:text-[48px] font-sans text-[#1f1f1f] tracking-[-1px] md:tracking-[-1.5px] leading-tight font-normal mb-8 sm:mb-12">
                Recent Our{" "}
                <span className="font-serif italic font-medium text-[#1f1f1f]">
                  Blog Posts
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {recommendedPosts.map((rec) => (
                  <Link
                    key={rec.slug}
                    href={`/blog/${rec.slug}`}
                    className="group bg-[#ffffff] rounded-2xl p-6 border border-[#e5e3d7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative aspect-[1.25] w-full rounded-lg overflow-hidden bg-black/5 mb-4 sm:mb-5">
                      <BlogImage
                        src={rec.coverImage}
                        fallbackSrc={rec.fallbackCoverImage}
                        alt={rec.title}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-5 h-[1px] bg-[#606060] inline-block" />
                          <span className="text-sm text-[#606060] font-normal">
                            {rec.date}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-[20px] font-sans font-medium text-[#1f1f1f] group-hover:text-[#274839] transition-colors leading-[1.4] line-clamp-2">
                          {rec.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

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
