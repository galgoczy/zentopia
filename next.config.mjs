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
  // Shareable short links that drop straight into the booking section.
  // /book and /foglalas land on the Hungarian page, where middleware.ts routes
  // a first-time visitor from outside HU on to /en — the fragment survives
  // that second hop, so they still arrive at the booking section. /booking
  // pins English for when the language should not be guessed at all.
  async redirects() {
    return [
      { source: "/book", destination: "/#beszeljunk", permanent: false },
      { source: "/foglalas", destination: "/#beszeljunk", permanent: false },
      { source: "/booking", destination: "/en#beszeljunk", permanent: false },
    ];
  },
};

export default nextConfig;
