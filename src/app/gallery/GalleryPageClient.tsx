"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  aspect: "short" | "tall";
}

const featuredPhoto: GalleryItem = {
  id: "featured-1",
  src: "/assets/gallery-hero.png",
  title: "Family Garden Care & Sustainable Terrace Planters",
  aspect: "short",
};

// Column 1: Short, Tall, Short, Tall
const column1: GalleryItem[] = [
  {
    id: "col1-1",
    src: "/assets/gallery-grid-1.png",
    title: "Residential Lawn Mowing & Edging",
    aspect: "short",
  },
  {
    id: "col1-2",
    src: "/assets/gallery-grid-2.png",
    title: "Stone Villa Estate Walkway & Lawn",
    aspect: "tall",
  },
  {
    id: "col1-3",
    src: "/assets/gallery-grid-3.png",
    title: "Commercial Orchard & Field Mowing",
    aspect: "short",
  },
  {
    id: "col1-4",
    src: "/assets/gallery-grid-4.png",
    title: "Precision Flower Bed & Shrub Pruning",
    aspect: "tall",
  },
];

// Column 2: Tall, Short, Tall, Short
const column2: GalleryItem[] = [
  {
    id: "col2-1",
    src: "/assets/gallery-grid-5.png",
    title: "Country Cottage Front Lawn & Gardens",
    aspect: "tall",
  },
  {
    id: "col2-2",
    src: "/assets/gallery-grid-6.png",
    title: "Family Lawn Care & Healthy Turf",
    aspect: "short",
  },
  {
    id: "col2-3",
    src: "/assets/gallery-grid-7.png",
    title: "Family Garden Care & Flower Watering",
    aspect: "tall",
  },
  {
    id: "col2-4",
    src: "/assets/gallery-grid-8.png",
    title: "Professional Hedge Trimming & Shrub Care",
    aspect: "short",
  },
];

// Column 3: Short, Tall, Short, Tall
const column3: GalleryItem[] = [
  {
    id: "col3-1",
    src: "/assets/gallery-grid-9.png",
    title: "Border Fencing & Turf Care",
    aspect: "short",
  },
  {
    id: "col3-2",
    src: "/assets/gallery-grid-10.png",
    title: "Targeted Organic Pest Spraying & Shrub Care",
    aspect: "tall",
  },
  {
    id: "col3-3",
    src: "/assets/gallery-grid-11.png",
    title: "Mechanical Turf Seeding & Fertilizing",
    aspect: "short",
  },
  {
    id: "col3-4",
    src: "/assets/gallery-grid-12.png",
    title: "Evergreen Nursery Seedling Cultivation",
    aspect: "tall",
  },
];

// All images in display order for smooth lightbox cycling
const allGalleryItems: GalleryItem[] = [
  featuredPhoto,
  column1[0],
  column2[0],
  column3[0],
  column1[1],
  column2[1],
  column3[1],
  column1[2],
  column2[2],
  column3[2],
  column1[3],
  column2[3],
  column3[3],
];

export default function GalleryPageClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Touch gesture refs for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  const openLightbox = (item: GalleryItem) => {
    const idx = allGalleryItems.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + allGalleryItems.length) % allGalleryItems.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % allGalleryItems.length
    );
  }, []);

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold: 45px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        showNext(); // Swipe left to next image
      } else {
        showPrev(); // Swipe right to previous image
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentLightboxItem =
    lightboxIndex !== null ? allGalleryItems[lightboxIndex] : null;

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* 1. Sticky Boxy Header */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* 2. Hero Section */}
      <section className="pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-6 sm:pb-8 px-4 sm:px-8 lg:px-[80px]">
        <div className="max-w-[1610px] mx-auto text-center">
          <h1 className="text-[38px] sm:text-[50px] lg:text-[64px] font-medium text-[#1f1f1f] tracking-[-1.5px] lg:tracking-[-2px] leading-[1.15] max-w-4xl mx-auto">
            Our Landscaping{" "}
            <span className="font-serif italic font-normal text-[#1f1f1f]">
              Gallery
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#606060] leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5 font-normal">
            Our Greenly Journey Today reflects our commitment to creating
            healthier more beautiful outdoor spaces through expert care
            sustainable.
          </p>
        </div>
      </section>

      {/* 3. Large Landscape Featured Photo */}
      <section className="px-4 sm:px-8 lg:px-[80px] pb-8 sm:pb-12">
        <div className="max-w-[1610px] mx-auto">
          <div
            onClick={() => openLightbox(featuredPhoto)}
            className="group cursor-pointer relative aspect-[2408/1278] w-full rounded-[12px] overflow-hidden bg-black/5 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={featuredPhoto.src}
              alt={featuredPhoto.title}
              fill
              priority
              sizes="(min-width: 1610px) 1610px, (min-width: 768px) calc(100vw - 60px), calc(100vw - 32px)"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-Column Asymmetric Masonry Gallery Grid */}
      <section className="py-6 sm:py-10 px-4 sm:px-8 lg:px-[80px]">
        <div className="max-w-[1610px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {/* Column 1: Short top, tall, short, tall */}
            <div className="flex flex-col gap-5">
              {column1.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className={`group cursor-pointer relative rounded-[10px] overflow-hidden bg-black/5 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    item.aspect === "short"
                      ? "aspect-[776/532]"
                      : "aspect-[776/966]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1610px) 523px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Tall top, short, tall, short */}
            <div className="flex flex-col gap-5">
              {column2.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className={`group cursor-pointer relative rounded-[10px] overflow-hidden bg-black/5 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    item.aspect === "short"
                      ? "aspect-[776/532]"
                      : "aspect-[776/966]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1610px) 523px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: Short top, tall, short, tall */}
            <div className="flex flex-col gap-5">
              {column3.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className={`group cursor-pointer relative rounded-[10px] overflow-hidden bg-black/5 shadow-sm border border-[#e5e3d7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    item.aspect === "short"
                      ? "aspect-[776/532]"
                      : "aspect-[776/966]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1610px) 523px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="w-10 h-10 rounded-full bg-[#bedd25] text-[#1f1f1f] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Layered Dark Green CTA Banner */}
      <CtaBanner
        onOpenQuote={() => handleOpenQuote()}
        title="Transform Your"
        titleSecondLine="Garden"
        highlight="with Experts"
        subtitle="Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision."
        buttonText="Get A Free Quote"
        buttonHref="/contact-us"
      />

      {/* 6. Standardized Site Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-[#bedd25] transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-[#bedd25] transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-[#bedd25] transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] sm:h-[82vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-[12px] overflow-hidden">
              <Image
                src={currentLightboxItem.src}
                alt={currentLightboxItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm sm:text-base font-medium text-white/90">
                {currentLightboxItem.title}
              </p>
              <p className="text-xs text-white/60 mt-0.5">
                {lightboxIndex! + 1} of {allGalleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}
