/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });

    return config;
  },
};

export default nextConfig;
