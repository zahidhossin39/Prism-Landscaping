import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/service",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/service/:slug",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
