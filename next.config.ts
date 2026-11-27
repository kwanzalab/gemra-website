import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // English is the primary language: send visitors at "/" to "/en".
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
