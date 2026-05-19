import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  typescript: {
    // Prisma types генерируются локально, не нужны для лендинга
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
