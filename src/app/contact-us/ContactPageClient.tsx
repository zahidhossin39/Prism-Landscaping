"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ContactPageClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* Top Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Contact Hero Section matching Framer layout */}
      <section className="w-full pt-[140px] sm:pt-[160px] lg:pt-[183px] pb-[60px] sm:pb-[80px] lg:pb-[100px] px-5 sm:px-8">
        <div className="max-w-[1204px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14">
            {/* Left Column: Heading, Subtitle & Info Card */}
            <div className="w-full lg:max-w-[414px] flex flex-col items-start gap-6 sm:gap-8">
              {/* Heading with bottom divider line */}
              <div className="w-full border-b border-black/10 pb-6">
                <h1 className="text-[40px] sm:text-[48px] lg:text-[62px] font-medium text-[#1f1f1f] tracking-[-2px] leading-[1.12]">
                  Let’s{" "}
                  <span className="font-serif italic font-normal text-[#1f1f1f]">
                    Connect
                  </span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-[#606060] leading-[1.56]">
                  Our experts are ready to help you create and maintain a healthy beautiful garden or lawn whether.
                </p>
              </div>

              {/* Contact Information Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-[332px] flex flex-col gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div>
                  <span className="block text-sm font-medium text-[#606060] tracking-[-0.03em] leading-[1.7] mb-0.5">
                    Phone:
                  </span>
                  <a
                    href="tel:+1 (000) 123-4567"
                    className="text-base font-normal text-[#1f1f1f] hover:text-[#bedd25] transition-colors inline-block"
                  >
                    +1 (000) 123-4567
                  </a>
                </div>

                <div>
                  <span className="block text-sm font-medium text-[#606060] tracking-[-0.03em] leading-[1.7] mb-0.5">
                    Email:
                  </span>
                  <a
                    href="mailto:info@gardencare.com"
                    className="text-base font-normal text-[#1f1f1f] hover:text-[#bedd25] transition-colors inline-block break-all"
                  >
                    info@gardencare.com
                  </a>
                </div>

                <div>
                  <span className="block text-sm font-medium text-[#606060] tracking-[-0.03em] leading-[1.7] mb-0.5">
                    Address:
                  </span>
                  <a
                    href="https://www.google.com/maps/search/23+Greenway+Street,+City+Name/@-35.1526892,147.3321224,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-normal text-[#1f1f1f] hover:text-[#bedd25] transition-colors inline-block"
                  >
                    23 Greenway Street, City Name
                  </a>
                </div>

                <div>
                  <span className="block text-sm font-medium text-[#606060] tracking-[-0.03em] leading-[1.7] mb-0.5">
                    Hours:
                  </span>
                  <p className="text-base font-normal text-[#1f1f1f]">
                    Mon – Sat: 8:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Schedule Your Demo Form Card */}
            <div className="w-full lg:max-w-[606px]">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-10 lg:p-12 w-full flex flex-col gap-6 sm:gap-8 lg:gap-[40px] shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-medium text-[#1f1f1f] text-center tracking-[-1px] leading-[1.41]">
                  Schedule Your Demo
                </h2>

                {isSubmitted ? (
                  <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#bedd25]/20 text-[#274839] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-xl font-medium text-[#1f1f1f]">
                      Thank You!
                    </h3>
                    <p className="text-sm text-[#606060] max-w-sm mx-auto leading-relaxed">
                      Your demo request has been received. Our gardening specialists will contact you shortly to confirm your appointment.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="text-xs font-semibold text-[#274839] hover:underline cursor-pointer"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="fullName"
                        className="text-base sm:text-lg font-medium text-[#1f1f1f] tracking-[0.1px] leading-[1.6]"
                      >
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full bg-[#f2f1e7] text-[#1f1f1f] placeholder:text-[#606060] px-4 py-3.5 sm:py-4 rounded-lg border border-[#1f1f1f]/5 focus:border-[#274839] focus:outline-none text-base transition-colors"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="email"
                        className="text-base sm:text-lg font-medium text-[#1f1f1f] tracking-[0.1px] leading-[1.6]"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full bg-[#f2f1e7] text-[#1f1f1f] placeholder:text-[#606060] px-4 py-3.5 sm:py-4 rounded-lg border border-[#1f1f1f]/5 focus:border-[#274839] focus:outline-none text-base transition-colors"
                      />
                    </div>

                    {/* Phone Number (Optional) */}
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="phone"
                        className="text-base sm:text-lg font-medium text-[#1f1f1f] tracking-[0.1px] leading-[1.6]"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+982356790"
                        className="w-full bg-[#f2f1e7] text-[#1f1f1f] placeholder:text-[#606060] px-4 py-3.5 sm:py-4 rounded-lg border border-[#1f1f1f]/5 focus:border-[#274839] focus:outline-none text-base transition-colors"
                      />
                    </div>

                    {/* Address (Optional) */}
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="address"
                        className="text-base sm:text-lg font-medium text-[#1f1f1f] tracking-[0.1px] leading-[1.6]"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Steet address, city, zip code"
                        className="w-full bg-[#f2f1e7] text-[#1f1f1f] placeholder:text-[#606060] px-4 py-3.5 sm:py-4 rounded-lg border border-[#1f1f1f]/5 focus:border-[#274839] focus:outline-none text-base transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#bedd25] hover:bg-[#adce1e] active:scale-[0.99] text-[#1f1f1f] font-medium py-4 px-5 rounded-[10px] text-base transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-75"
                      >
                        <span>
                          {isSubmitting ? "Submitting..." : "Book Your Services"}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full relative h-[440px] sm:h-[500px] lg:h-[580px] overflow-hidden bg-[#e5e3d7]">
        {/* Floating Open in Maps Button */}
        <div className="absolute top-5 left-5 sm:top-6 sm:left-8 z-10">
          <a
            href="https://www.google.com/maps/search/23+Greenway+Street,+City+Name/@-35.1526892,147.3321224,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f1efd9] text-[#1f1f1f] px-3.5 py-2 rounded-md text-xs font-medium shadow-md border border-[#e5e3d7] transition-all duration-200 hover:scale-[1.02]"
          >
            <span>Open in Maps</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#1f1f1f]" />
          </a>
        </div>

        {/* Embedded Map */}
        <iframe
          title="Greenly Location Map"
          src="https://maps.google.com/maps?q=23%20Greenway%20Street,%20City%20Name&z=14&output=embed"
          className="w-full h-full border-0 contrast-[1.02]"
          loading="lazy"
          allowFullScreen
        />
      </section>

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
