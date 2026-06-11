import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blogs",
  assetPrefix: "/blogs/",
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: { root: path.resolve('../..') },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blogs',
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
