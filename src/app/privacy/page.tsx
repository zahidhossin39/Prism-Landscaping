import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy - Greenly Gardening Service Website",
  description: "Learn how Greenly protects your personal data and respects your privacy.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
