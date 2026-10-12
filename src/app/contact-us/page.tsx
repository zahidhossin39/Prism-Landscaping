import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us - Greenly Gardening Service Website",
  description:
    "Transform Your Outdoor Space Effortlessly Today. Connect with Greenly's lawn care and gardening specialists to schedule your demo.",
};

export default function ContactUsPage() {
  return <ContactPageClient />;
}
