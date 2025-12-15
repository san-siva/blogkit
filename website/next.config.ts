import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/blogkit' : '',
  trailingSlash: true,
  transpilePackages: ['stylekit', 'blogkit'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
