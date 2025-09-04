import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.independent.co.uk",
      },
      {
        protocol: "https",
        hostname: "cleigh6.tripod.com",
      },
      {
        protocol: "https",
        hostname: "i.guim.co.uk",
      },
    ],
  },
};

export default nextConfig;
