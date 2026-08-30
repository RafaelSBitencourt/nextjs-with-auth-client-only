import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/nextjs-with-auth-client-only",
};

export default nextConfig;
