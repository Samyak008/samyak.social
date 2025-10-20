/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove typedRoutes to fix the build error
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