import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "yxbboqcacbihxherpisb.supabase.co",
      }
    ],
    domains: ['yxbboqcacbihxherpisb.supabase.co'], // allow images from Supabase
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
