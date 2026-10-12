import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";
import { getFeaturedBlog, getRecentBlogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog - Greenly - Gardening Service Website",
  description:
    "Explore Greenly's gardening and landscaping blog for expert lawn care tips, seasonal planting advice, and creative outdoor inspiration.",
};

export default function BlogPage() {
  const featuredPost = getFeaturedBlog();
  const recentPosts = getRecentBlogs();

  return (
    <BlogIndexClient
      featuredPost={featuredPost}
      recentPosts={recentPosts}
    />
  );
}
