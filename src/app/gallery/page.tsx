import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery - Greenly - Gardening Service Website",
  description:
    "Our Greenly Journey Today reflects our commitment to creating healthier more beautiful outdoor spaces through expert care sustainable. Explore our landscaping gallery.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
