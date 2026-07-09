/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from the DummyJSON API
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

module.exports = nextConfig;
