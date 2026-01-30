import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/blogs",
  assetPrefix: "/blogs/",
  trailingSlash: true,
  reactStrictMode: true,
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
