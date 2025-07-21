/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.ibb.co', // ImgBB domain
      'ibb.co',   // ImgBB alternative domain
      // Add your AI service domain here if it serves images
      // 'your-ai-service-domain.com'
    ],
  },
  // Enable API routes if needed
  async rewrites() {
    return [
      // Add any API rewrites if needed
    ];
  },
};

export default nextConfig;
