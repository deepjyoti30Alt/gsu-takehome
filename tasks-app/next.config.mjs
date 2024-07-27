/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/users/:path*",
        destination: `${API_URL}/users/:path*`,
      },
    ];
  },
};

export default nextConfig;
