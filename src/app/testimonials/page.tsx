import type { Metadata } from "next";
import TestimonialsPageClient from "./TestimonialsPageClient";

export const metadata: Metadata = {
  title: "Testimonials - Greenly Gardening Service Website",
  description:
    "Trusted by 12k+ happy customers. Discover reviews, ratings, and video stories from homeowners and commercial property managers.",
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
