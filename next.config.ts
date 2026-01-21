/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.seven82motors.com.au",
        port: "",
        pathname: "/**", // allows all paths on this domain
      },
      {
        protocol: "https",
        hostname: "tg-production-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // Add any other domains your API uses (e.g. bennettsclassicauctions.com.au, etc.)
      {
        protocol: "https",
        hostname: "www.bennettsclassicauctions.com.au",
        port: "",
        pathname: "/**",
      },
      // Optional: placeholder domain if you use one
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
