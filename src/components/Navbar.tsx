"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenQuote: (service?: string) => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300">
      <div
        className={`max-w-[1204px] mx-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "bg-[#ffffff]/90 backdrop-blur-md shadow-md border border-[#e5e3d7]"
            : "bg-[#ffffff] shadow-sm border border-[#e8e6dc]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/assets/logo.svg"
            alt="Greenly Logo"
            width={114}
            height={31}
            priority
            className="h-7 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#1f1f1f]">
          {/* Dropdown for Pages */}
          <div className="relative group" onMouseLeave={() => setDropdownOpen(false)}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className="flex items-center gap-1.5 py-1 text-[#1f1f1f] hover:text-[#274839] transition-colors font-medium"
            >
              <span>Pages</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-[#ffffff] rounded-2xl shadow-xl border border-[#e5e3d7] py-2 px-1 text-sm animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-xl text-[#1f1f1f] hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
                >
                  Home Landing
                </Link>
                <a
                  href="#about"
                  className="block px-3 py-2 rounded-xl text-[#1f1f1f] hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 rounded-xl text-[#1f1f1f] hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
                >
                  Our Services
                </a>
                <a
                  href="#blog"
                  className="block px-3 py-2 rounded-xl text-[#1f1f1f] hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
                >
                  Our Blog
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 rounded-xl text-[#1f1f1f] hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            )}
          </div>

          <a href="#about" className="hover:text-[#274839] transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-[#274839] transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-[#274839] transition-colors">
            Contact
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenQuote()}
            className="flex items-center gap-2.5 bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] pl-4 sm:pl-5 pr-2.5 sm:pr-3 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 group shadow-sm hover:shadow"
          >
            <span>Get A Free Quote</span>
            <span className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#1f1f1f] hover:bg-[#f1efd9] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-[1204px] bg-[#ffffff] rounded-3xl shadow-2xl border border-[#e5e3d7] p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#1f1f1f]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
            >
              Home
            </Link>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
            >
              Services
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
            >
              Gallery
            </a>
            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
            >
              Blog
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-[#f1efd9] hover:text-[#274839] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="pt-2 border-t border-[#f1efd9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 px-5 rounded-full bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Get A Free Quote</span>
              <div className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
