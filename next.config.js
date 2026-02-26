// next.config.js (CommonJS)
const nextConfig = {
  reactStrictMode: true,
    typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com", "randomuser.me"],
  },
};

module.exports = nextConfig;
