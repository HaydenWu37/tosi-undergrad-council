import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Journal Club now lives under Events. Keep old links working.
  async redirects() {
    return [{ source: "/journal-club", destination: "/events/journal-club", permanent: true }];
  },
};

export default nextConfig;
