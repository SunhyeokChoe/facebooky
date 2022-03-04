/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'scontent.ficn4-1.fna.fbcdn.net',
      'links.papareact.com',
      'firebasestorage.googleapis.com',
      'platform-lookaside.fbsbx.com',
    ],
  },
}

module.exports = nextConfig
