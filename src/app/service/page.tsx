import type { Metadata } from "next";
import ServicePageClient from "./ServicePageClient";

export const metadata: Metadata = {
  title: "Greenly - Gardening Service Website",
  description: "Transform Your Outdoor Space Effortlessly Today. Professional gardening and lawn care services.",
};

export default function ServicePage() {
  return <ServicePageClient />;
}
