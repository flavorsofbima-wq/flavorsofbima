/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export the whole site as static HTML/CSS/JS into the `out/` folder,
  // so it can be hosted on any static host (GoDaddy, etc.) — no Node server.
  output: "export",
  // Static hosts serve /product/avakaya/index.html, so add trailing slashes
  // and disable Next's image optimizer (which needs a server).
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
