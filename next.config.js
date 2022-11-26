/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.nftstorage.link',
      },
      {
        protocol: 'https',
        hostname: 'lotusgang-assets.sfo3.cdn.digitaloceanspaces.com',
      },
    ],
  },
}

module.exports = nextConfig
