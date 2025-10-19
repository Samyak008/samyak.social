/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;