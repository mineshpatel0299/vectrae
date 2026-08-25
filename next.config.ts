import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/services/boardroom-av", destination: "/solutions/av-solutions", permanent: true },
      { source: "/services/networking-wifi", destination: "/solutions/networking-security", permanent: true },
      { source: "/services/data-center-security", destination: "/solutions/data-center", permanent: true },
      { source: "/services/end-computing", destination: "/solutions/end-computing", permanent: true },
      { source: "/services/it-spares", destination: "/solutions/it-spares-accessories", permanent: true },
      { source: "/services/:slug*", destination: "/solutions", permanent: true },
    ];
  },
};

export default nextConfig;
