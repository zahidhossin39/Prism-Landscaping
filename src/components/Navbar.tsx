"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenQuote?: (service?: string) => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

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

  // Close menus on outside click, window resize, or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
      if (
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [dropdownOpen, mobileMenuOpen]);

  // Close menus on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }

  const handleBookDemo = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onOpenQuote) {
      onOpenQuote("Book A Demo");
    } else {
      router.push("/contact-us");
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300"
    >
      <div
        className={`max-w-[1204px] mx-auto rounded-[10px] px-4 sm:px-5 md:pl-5 md:pr-[13px] py-2.5 sm:py-[13px] transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "bg-[#ffffff]/95 backdrop-blur-md shadow-sm border border-[#e5e3d7]"
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

        {/* Right Section: Desktop Nav + CTA Button + Mobile Hamburger */}
        <div className="flex items-center gap-3 md:gap-8 lg:gap-[60px]">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium tracking-[-0.2px] text-[#1f1f1f]">
          {/* Dropdown for Pages */}
          <div
            ref={dropdownRef}
            className="relative group"
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`flex items-center gap-1.5 py-1 font-medium transition-colors cursor-pointer ${
                dropdownOpen
                  ? "text-[#ff7b00]"
                  : "text-[#1f1f1f] hover:text-[#274839]"
              }`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span>All pages</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-[#ff7b00]" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full -left-3 sm:-left-4 mt-2.5 bg-[#ffffff] rounded-[10px] shadow-xl border border-[#e5e3d7] px-7 py-6 text-[15px] animate-in fade-in slide-in-from-top-2 duration-150 z-50 whitespace-nowrap before:absolute before:-top-3 before:-left-4 before:-right-4 before:h-3 before:content-['']"
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <div className="flex gap-12 sm:gap-14">
                  {/* Left Column */}
                  <div className="flex flex-col space-y-3.5 text-left font-normal">
                    <Link
                      href="/"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/about"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      About
                    </Link>
                    <Link
                      href="/service"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/service"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Services
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname.startsWith("/blog")
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/contact-us"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/contact-us"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Contact us
                    </Link>
                    <Link
                      href="/testimonials"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/testimonials"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Testimonials
                    </Link>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col space-y-3.5 text-left font-normal">
                    <Link
                      href="/gallery"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/gallery"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Gallery
                    </Link>
                    <button
                      type="button"
                      onClick={handleBookDemo}
                      className="text-left text-[#1f1f1f] hover:text-[#274839] transition-colors cursor-pointer"
                    >
                      Book A Demo
                    </button>
                    <Link
                      href="/privacy"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/privacy"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/404"
                      onClick={() => setDropdownOpen(false)}
                      className={`transition-colors ${
                        pathname === "/404"
                          ? "text-[#274839] font-medium"
                          : "text-[#1f1f1f] hover:text-[#274839]"
                      }`}
                    >
                      404
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`transition-colors ${
              pathname === "/about"
                ? "text-[#274839] font-semibold"
                : "hover:text-[#274839]"
            }`}
          >
            About
          </Link>
          <Link
            href="/service"
            className={`transition-colors ${
              pathname === "/service"
                ? "text-[#274839] font-semibold"
                : "hover:text-[#274839]"
            }`}
          >
            Services
          </Link>
          <Link
            href="/contact-us"
            className={`transition-colors ${
              pathname === "/contact-us"
                ? "text-[#274839] font-semibold"
                : "hover:text-[#274839]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact-us"
            className="hidden md:inline-flex items-center justify-center bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] px-[21px] py-[8px] rounded-[8px] text-[16px] font-medium tracking-[-0.2px] transition-all duration-200 shadow-sm hover:shadow cursor-pointer whitespace-nowrap"
          >
            Get A Free Quote
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[8px] text-[#1f1f1f] hover:bg-[#f1efd9] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="md:hidden mt-2 mx-auto max-w-[1204px] max-h-[calc(100vh-100px)] overflow-y-auto bg-[#ffffff] rounded-[10px] shadow-xl border border-[#e5e3d7] p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-medium text-[#1f1f1f]">
            {/* Left column */}
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/about"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                About
              </Link>
              <Link
                href="/service"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/service"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Services
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname.startsWith("/blog")
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/contact-us"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Contact us
              </Link>
              <Link
                href="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/testimonials"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Testimonials
              </Link>
            </div>

            {/* Right column */}
            <div className="flex flex-col space-y-1">
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/gallery"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Gallery
              </Link>
              <button
                type="button"
                onClick={handleBookDemo}
                className="text-left px-3 py-2 rounded-[8px] hover:bg-[#f1efd9] hover:text-[#274839] transition-colors cursor-pointer"
              >
                Book A Demo
              </button>
              <Link
                href="/privacy"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/privacy"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/404"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[8px] transition-colors ${
                  pathname === "/404"
                    ? "bg-[#f1efd9] text-[#274839] font-semibold"
                    : "hover:bg-[#f1efd9] hover:text-[#274839]"
                }`}
              >
                404
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-[#f1efd9]">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 px-5 rounded-[8px] bg-[#bedd25] hover:bg-[#adce1e] active:scale-[0.99] text-[#1f1f1f] font-medium text-[16px] tracking-[-0.2px] transition-all duration-200 text-center cursor-pointer shadow-sm hover:shadow"
            >
              Get A Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
