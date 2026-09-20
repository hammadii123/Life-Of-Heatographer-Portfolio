import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 rejects any quality not listed here (the request 400s and the
    // photograph never renders). Every quality used anywhere in the app must
    // appear in this list.
    qualities: [70, 75, 82, 84, 88],
    // Photographs are the product. Serve the exact size each screen needs and
    // nothing larger — a 4000px original must never reach a phone.
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920, 2560],
    imageSizes: [16, 32, 64, 96, 128, 256, 384, 512, 768],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Stop other sites from hotlinking the photographs into their own pages.
        source: "/_next/image",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
    ];
  },
};

export default nextConfig;
