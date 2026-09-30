/* @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  distDir: ".next",
  async rewrites() {
    return [
      {
        source: "/_next/:path*",
        destination: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
