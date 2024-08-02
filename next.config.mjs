/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "d6wj5dvpnlsrw2wt47bxc2kdmpp1mfuv-video-uploads.s3.ap-south-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
