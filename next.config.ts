import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Silence warning about inferred workspace root by explicitly setting it
    root: __dirname,
  },
};

export default nextConfig;
