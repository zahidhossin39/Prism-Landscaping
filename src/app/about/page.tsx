import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us - Greenly - Gardening Service Website",
  description:
    "Our Greenly Journey reflects our commitment to creating healthier more beautiful outdoor spaces through expert care and sustainable practices.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
