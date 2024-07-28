/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/users/:path*",
        destination: `${API_URL}/users/:path*`,
      },
      {
        source: "/api/tasks/",
        destination: `${API_URL}/tasks/`,
      },
      {
        source: "/api/tasks/:path*",
        destination: `${API_URL}/tasks/:path*`,
      },
    ];
  },
};

export default nextConfig;
