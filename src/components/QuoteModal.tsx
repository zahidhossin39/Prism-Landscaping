"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const AVAILABLE_SERVICES = [
  "Book A Demo",
  "Garden Maintenance",
  "Shrub Trimming",
  "Landscaping Design",
  "Mulching",
  "Irrigation Installation",
  "Soil Testing",
  "Lawn Aeration",
  "Seasonal Cleanups",
  "Pest Control",
  "Lawn Mowing",
  "Tree Pruning",
];

export default function QuoteModal({ isOpen, onClose, defaultService = "Lawn Mowing" }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [prevService, setPrevService] = useState(defaultService);
  if (defaultService !== prevService) {
    setPrevService(defaultService);
    setFormData((prev) => ({ ...prev, service: defaultService }));
  }

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 2500);
    }, 500);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300"
      onClick={handleClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#ffffff] rounded-2xl shadow-2xl border border-[#e2dec9] text-[#1f1f1f] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#606060] hover:text-[#1f1f1f] hover:bg-[#f2f1e7] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#bedd25]/20 text-[#274839] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#274839]" />
            </div>
            <h3 className="text-2xl font-serif text-[#274839]">
              Thank You!
            </h3>
            <p className="text-[#606060] text-sm max-w-sm mx-auto">
              We received your request for <span className="font-semibold text-[#1f1f1f]">{formData.service}</span>. Our expert team will get in touch with you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#274839] bg-[#bedd25]/30 px-3 py-1 rounded-full">
                Fast & Free Estimate
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#274839] mt-3 font-medium">
                Get A Free <span className="font-serif italic font-bold">Quote</span>
              </h2>
              <p className="text-sm text-[#606060] mt-1">
                Tell us about your outdoor space, and we will send a tailored estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1f1f1f] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d8d4bf] bg-[#f9f8f2] text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#274839] transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1f1f1f] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d8d4bf] bg-[#f9f8f2] text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#274839] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1f1f1f] uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d8d4bf] bg-[#f9f8f2] text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#274839] transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1f1f1f] uppercase tracking-wider mb-1.5">
                  Select Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d8d4bf] bg-[#f9f8f2] text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#274839] transition-all text-sm cursor-pointer"
                >
                  <option value="Book A Demo">Book A Demo / Consultation</option>
                  <option value="Garden Maintenance">Garden Maintenance</option>
                  <option value="Shrub Trimming">Shrub Trimming</option>
                  <option value="Landscaping Design">Landscaping Design</option>
                  <option value="Mulching">Mulching</option>
                  <option value="Irrigation Installation">Irrigation Installation</option>
                  <option value="Soil Testing">Soil Testing</option>
                  <option value="Lawn Aeration">Lawn Aeration</option>
                  <option value="Seasonal Cleanups">Seasonal Cleanups</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Lawn Mowing">Lawn Mowing</option>
                  <option value="Tree Pruning">Tree Pruning</option>
                  {!AVAILABLE_SERVICES.includes(formData.service) && (
                    <option value={formData.service}>{formData.service}</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1f1f1f] uppercase tracking-wider mb-1.5">
                  Yard Size or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your garden, dimensions, or specific requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d8d4bf] bg-[#f9f8f2] text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#274839] transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-[#bedd25] hover:bg-[#adce1e] text-[#1f1f1f] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm hover:shadow"
              >
                <span>Submit Request</span>
                <div className="w-6 h-6 rounded-full bg-[#1f1f1f] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
