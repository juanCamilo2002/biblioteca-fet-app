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
            },
            {
              protocol: 'https',
              hostname: 'fet-node.s3.us-east-2.amazonaws.com',
            }
          ],
      },
};

export default nextConfig;
