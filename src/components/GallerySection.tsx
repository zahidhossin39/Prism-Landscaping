"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";

interface GallerySectionProps {
  onOpenQuote: () => void;
}

const galleryImages = [
  { src: "/assets/gallery-1.png", title: "Residential Lawn Mowing" },
  { src: "/assets/gallery-2.png", title: "Country Estate Landscape" },
  { src: "/assets/gallery-3.png", title: "Power Equipment Lawn Care" },
  { src: "/assets/gallery-4.png", title: "Flower Bed & Shrub Pruning" },
  { src: "/assets/gallery-5.png", title: "Backyard Turf Restoration" },
  { src: "/assets/gallery-6.png", title: "Tall Hedge Precision Shearing" },
];

export default function GallerySection({ onOpenQuote }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
              Our Landscaping{" "}
              <span className="font-serif italic font-semibold text-[#274839]">
                Gallery
              </span>
            </h2>
          </div>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-6 pr-3.5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 group shadow-sm hover:shadow"
          >
            <span>View Full Gallery</span>
            <span className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* 3 Interlocking Asymmetric Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Column 1: Short top, tall bottom */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <div
              onClick={() => setSelectedImage(galleryImages[0].src)}
              className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedImage(galleryImages[3].src)}
              className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/10 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={galleryImages[3].src}
                alt={galleryImages[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Tall top, short bottom */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <div
              onClick={() => setSelectedImage(galleryImages[1].src)}
              className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/10 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={galleryImages[1].src}
                alt={galleryImages[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedImage(galleryImages[4].src)}
              className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={galleryImages[4].src}
                alt={galleryImages[4].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Short top, tall bottom */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <div
              onClick={() => setSelectedImage(galleryImages[2].src)}
              className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={galleryImages[2].src}
                alt={galleryImages[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedImage(galleryImages[5].src)}
              className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/10 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={galleryImages[5].src}
                alt={galleryImages[5].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[65vh] sm:h-[80vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedImage}
              alt="Enlarged gallery view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
