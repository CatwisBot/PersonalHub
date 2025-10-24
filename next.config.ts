import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slashes for Capacitor
  trailingSlash: true,
};

export default nextConfig;
