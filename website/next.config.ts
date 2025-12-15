import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['stylekit', 'blogkit'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
