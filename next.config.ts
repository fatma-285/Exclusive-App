import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["*"] },
  },
  // output: "export",
};
module.exports = nextConfig;
export default nextConfig;
