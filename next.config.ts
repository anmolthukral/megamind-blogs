import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/blogs',
  assetPrefix: '/blogs/',
  trailingSlash: true,
  reactStrictMode: true
};

export default nextConfig;