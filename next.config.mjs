/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'via.placeholder.com',
            },
            {
              protocol: 'https',
              hostname: 'api-biblioteca-tau.vercel.app',
            }
          ],
      },
};

export default nextConfig;
