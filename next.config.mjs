/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
