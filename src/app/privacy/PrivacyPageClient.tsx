"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

interface PrivacySectionItem {
  title: string;
  paragraphs: string[];
}

const PRIVACY_SECTIONS: PrivacySectionItem[] = [
  {
    title: "Our Commitment to Your Data",
    paragraphs: [
      "At Greenly, safeguarding your personal information is paramount. This policy outlines our practices regarding the collection, use, and protection of your data. We are dedicated to maintaining your trust through transparent and secure data handling. This Privacy Policy applies to all users of our services, whether you're engaging with us online, through our mobile app, or directly. We encourage you to read this policy carefully to understand how we protect your information.",
    ],
  },
  {
    title: "How We Collect and Use Information",
    paragraphs: [
      "When you interact with Greenly, we collect information to improve and personalize your experience. This may include your name, contact details, and location to schedule services efficiently.",
      "To provide tailored lawn care, we collect data about your lawn's specific needs, such as grass type, soil condition, and any particular issues you've observed.",
      "All payment transactions are processed through secure, encrypted gateways. We do not store your complete payment information on our servers, ensuring your financial security.",
    ],
  },
  {
    title: "Data Sharing and Protection",
    paragraphs: [
      "We pledge not to sell or lease your personal data to third parties. Your information may be shared only with:",
      "We collaborate with trusted service providers who adhere to strict confidentiality agreements to assist in delivering our services.",
      "If required by law, we may disclose your information to comply with legal obligations or to protect our rights and safety.",
      "In the event of a merger or acquisition, your data will be transferred securely, with your privacy rights remaining protected.",
    ],
  },
  {
    title: "Your Control Over Your Data",
    paragraphs: [
      "You have the right to access, modify, or delete your personal data. You can also object to certain data uses and opt-out of marketing communications at any time.",
    ],
  },
  {
    title: "Our Commitment to Security",
    paragraphs: [
      "We employ advanced encryption and security protocols to protect your data. Access to personal information is restricted to authorized personnel, and we conduct regular security audits..",
      "While we strive for absolute security, no system is impenetrable. However, our measures significantly minimize risks and prevent unauthorized access.",
    ],
  },
  {
    title: "Links to External Sites",
    paragraphs: [
      "Our website may contain links to external sites. We are not responsible for their privacy practices, so please review their policies before using those sites.",
    ],
  },
  {
    title: "Policy Updates and Notifications",
    paragraphs: [
      "We may update this policy periodically to reflect changes in our practices. We will post changes on our website, and for significant updates, we will notify you directly.",
    ],
  },
  {
    title: "Contact and Support",
    paragraphs: [
      "If you have any questions or concerns about our privacy practices, please contact us at privacy @greenly.com or call us at Greenly, we are dedicated to ensuring a secure and productive partnership for all your lawn service needs.",
    ],
  },
];

export default function PrivacyPageClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Lawn Mowing");

  const handleOpenQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#f2f1e7] text-[#1f1f1f] relative overflow-hidden">
      {/* 1. Sticky Floating Navbar */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* 2. Page Header & Policy Content matching Framer template */}
      <section className="w-full pt-[140px] md:pt-[160px] lg:pt-[183px] pb-[60px] md:pb-[80px] lg:pb-[100px] px-4 sm:px-8 lg:px-[80px]">
        <div className="max-w-[1610px] mx-auto">
          {/* Page Header */}
          <div className="text-center space-y-5">
            <h1 className="text-[38px] sm:text-[52px] lg:text-[62px] font-medium text-[#1f1f1f] tracking-[-1px] sm:tracking-[-1.5px] lg:tracking-[-2px] leading-[1.2]">
              Privacy Policy
            </h1>
            <p className="text-[18px] text-[#606060] font-normal leading-[1.7] tracking-[0.1px]">
              Jun 16, 2026
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="max-w-[1020px] mx-auto mt-[30px] md:mt-[40px] lg:mt-[64px] space-y-12 md:space-y-[60px] text-left">
            {PRIVACY_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-4 md:space-y-5">
                <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1f1f1f] tracking-[-0.5px] leading-[1.4]">
                  {section.title}
                </h2>
                <div className="space-y-4 md:space-y-5">
                  {section.paragraphs.map((p, pIdx) => {
                    if (p.includes("privacy @greenly.com")) {
                      const parts = p.split("privacy @greenly.com");
                      return (
                        <p
                          key={pIdx}
                          className="text-[17px] md:text-[18px] text-[#606060] font-normal leading-[1.7] tracking-[0.1px]"
                        >
                          {parts[0]}
                          <a
                            href="mailto:privacy@greenly.com"
                            className="text-[#1f1f1f] hover:text-[#274839] underline underline-offset-2 transition-colors"
                          >
                            privacy @greenly.com
                          </a>
                          {parts[1]}
                        </p>
                      );
                    }
                    return (
                      <p
                        key={pIdx}
                        className="text-[17px] md:text-[18px] text-[#606060] font-normal leading-[1.7] tracking-[0.1px]"
                      >
                        {p}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Layered dark green CTA banner */}
      <CtaBanner
        onOpenQuote={() => handleOpenQuote()}
        title="Transform Your"
        titleSecondLine="Garden"
        highlight="with Experts"
        subtitle="Relax and enjoy a greener, more beautiful garden—expertly crafted to match your vision."
        buttonText="Get A Free Quote"
      />

      {/* 4. Standard #274839 dark footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}
