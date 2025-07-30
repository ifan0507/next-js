import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/payment/notification/:path",
        headers: [
          { key: "Access-Controller-Allow-Origin", value: "*" },
          {
            key: "Access-Controll-Allow-Methods",
            value: "GET,POST",
          },
          {
            key: "Access-Controll-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-with,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version",
          },
        ],
      },
    ];
  },

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "nkuecglninp5okxm.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
