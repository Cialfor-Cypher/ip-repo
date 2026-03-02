/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/intellectual_property",
  assetPrefix: "/intellectual_property",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
