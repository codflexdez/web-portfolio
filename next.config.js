/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zb8mtktv7vlt3sjq.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;