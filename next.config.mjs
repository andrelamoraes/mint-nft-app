/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
      config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
      });
      return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tan-informal-minnow-205.mypinata.cloud',
        pathname: '/ipfs/**',
      },
    ],
  },
  env: {
      API_KEY: process.env.API_KEY,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
      
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  serverRuntimeConfig: {
      apiKey: process.env.API_KEY,
      privateKey: process.env.PRIVATE_KEY,
  },
  
  publicRuntimeConfig: {
      contractAddress: process.env.CONTRACT_ADDRESS,
  },
};

export default nextConfig;