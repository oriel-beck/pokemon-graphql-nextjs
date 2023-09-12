/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'play.pokemonshowdown.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
