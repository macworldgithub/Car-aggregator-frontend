/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.seven82motors.com.au",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seven82motors.mymedia.delivery", // ← Add this block
        port: "",
        pathname: "/**", // Allows any path under this domain
      },
      {
        protocol: "https",
        hostname: "tg-production-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bennettsclassicauctions.com.au",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
