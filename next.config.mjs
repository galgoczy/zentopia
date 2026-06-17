/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Serve the standalone static skills page (public/skills/index.html) at the
  // clean /skills URL without a redirect.
  async rewrites() {
    return [{ source: "/skills", destination: "/skills/index.html" }];
  },
};

export default nextConfig;
