"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  onOpenQuote: (service?: string) => void;
}

export default function Footer({ onOpenQuote }: FooterProps) {
  return (
    <footer id="site-footer" className="bg-[#274839] text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-6 md:px-8 border-t border-[#345c4a]">
      <div className="max-w-[1204px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info (Col 1) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo-white.svg"
                alt="Greenly Logo"
                width={114}
                height={31}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
              We provide professional gardening and lawn care services focused
            </p>
          </div>

          {/* Quick Links (Col 2) */}
          <div className="lg:col-span-2 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-medium text-[#f2f1e7] tracking-[-0.2px]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <Link href="/about" className="hover:text-[#bedd25] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-[#bedd25] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#bedd25] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#bedd25] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#bedd25] transition-colors">
                  Our Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services (Col 3) */}
          <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-medium text-[#f2f1e7] tracking-[-0.2px]">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <button
                  onClick={() => onOpenQuote("Lawn Mowing")}
                  className="hover:text-[#bedd25] transition-colors text-left"
                >
                  Lawn Mowing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuote("Garden Maintenance")}
                  className="hover:text-[#bedd25] transition-colors text-left"
                >
                  Garden Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuote("Shrub Trimming")}
                  className="hover:text-[#bedd25] transition-colors text-left"
                >
                  Tree & Shrub Trimming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuote("Seasonal Cleanups")}
                  className="hover:text-[#bedd25] transition-colors text-left"
                >
                  Seasonal Cleanups
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links / Contact Details (Col 4) */}
          <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-medium text-[#f2f1e7] tracking-[-0.2px]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <a
                  href="mailto:info@gardencare.com"
                  className="hover:text-[#bedd25] transition-colors block break-all"
                >
                  info@gardencare.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+10001234567"
                  className="hover:text-[#bedd25] transition-colors block"
                >
                  +1 (000) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/123+Greenway+Street,+City+Name/@38.313351,-77.4350258,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#bedd25] transition-colors block"
                >
                  123 Greenway Street, City Name
                </a>
              </li>
              <li className="text-white/60 text-xs">
                Mon – Sat: 8:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Content Bar: Button & Social Icons */}
        <div className="py-7 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center justify-center bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
          >
            Book Your Service
          </button>

          {/* Social Icons matching Framer: LinkedIn, Instagram, X */}
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-[6px] bg-white hover:bg-white/90 flex items-center justify-center transition-all shadow-sm hover:scale-105 p-1.5"
              aria-label="LinkedIn"
            >
              <Image
                src="/assets/social-linkedin.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-[6px] bg-white hover:bg-white/90 flex items-center justify-center transition-all shadow-sm hover:scale-105 p-1.5"
              aria-label="Instagram"
            >
              <Image
                src="/assets/social-insta.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-[6px] bg-white hover:bg-white/90 flex items-center justify-center transition-all shadow-sm hover:scale-105 p-1.5"
              aria-label="X Twitter"
            >
              <Image
                src="/assets/social-x.svg"
                alt="X"
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain"
              />
            </a>
          </div>
        </div>

        {/* Centered Copyright & Privacy */}
        <div className="pt-6 text-center text-xs text-white/60 flex items-center justify-center gap-3">
          <p>© 2026 Greenly. All Rights Reserved.</p>
          <span className="text-white/30">•</span>
          <Link
            id="privacy"
            href="/privacy"
            className="hover:text-[#bedd25] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
