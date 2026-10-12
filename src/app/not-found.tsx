import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page Not Found - Greenly",
  description: "It seems the page you're looking for has been moved, removed, or doesn't exist. Don't worry—our garden is still growing.",
};

export default function NotFound() {
  return <NotFoundClient />;
}
