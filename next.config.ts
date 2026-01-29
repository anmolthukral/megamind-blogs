import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/blogs',
  assetPrefix: '/blogs/',
trailingSlash: false,
  reactStrictMode: true
};

export default nextConfig;