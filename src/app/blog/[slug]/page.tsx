import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import { getAllBlogs, getBlogBySlug, getRecommendedBlogs } from "@/data/blogs";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allBlogs = getAllBlogs();
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found - Greenly",
    };
  }

  return {
    title: `${post.title} - Greenly Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - Greenly Blog`,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const recommendedPosts = getRecommendedBlogs(slug, 3);

  return (
    <BlogDetailClient
      post={post}
      recommendedPosts={recommendedPosts}
    />
  );
}
