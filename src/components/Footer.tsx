"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenQuote: (service?: string) => void;
}

export default function Footer({ onOpenQuote }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#274839] text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-6 md:px-8 border-t border-[#345c4a]">
      <div className="max-w-[1204px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
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
              We provide professional gardening and lawn care services focused on beauty, sustainability, and attention to detail.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-3 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-5 pr-3 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 group shadow-md"
              >
                <span>Book Your Service</span>
                <span className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>

          {/* Quick Links (Col 2) */}
          <div className="lg:col-span-2 space-y-4 lg:border-r lg:border-white/10 lg:pr-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <a href="#about" className="hover:text-[#bedd25] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#bedd25] transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#bedd25] transition-colors">
                  Our Blog
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#bedd25] transition-colors">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Services (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
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

          {/* Contact (Col 4) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <a
                  href="mailto:info@gardencare.com"
                  className="hover:text-[#bedd25] transition-colors block"
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
              <li className="text-white/70">
                123 Greenway Street, City Name
              </li>
              <li className="text-white/60 text-xs">
                Mon – Sat: 8:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Greenly. All Rights Reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#bedd25] hover:text-[#1f1f1f] flex items-center justify-center transition-colors group p-2"
              aria-label="X Twitter"
            >
              <Image
                src="/assets/social-x.svg"
                alt="X"
                width={16}
                height={16}
                className="opacity-70 group-hover:opacity-100 group-hover:invert-0"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#bedd25] hover:text-[#1f1f1f] flex items-center justify-center transition-colors group p-2"
              aria-label="Instagram"
            >
              <Image
                src="/assets/social-insta.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="opacity-70 group-hover:opacity-100"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#bedd25] hover:text-[#1f1f1f] flex items-center justify-center transition-colors group p-2"
              aria-label="LinkedIn"
            >
              <Image
                src="/assets/social-linkedin.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="opacity-70 group-hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
