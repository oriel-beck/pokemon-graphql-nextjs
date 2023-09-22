/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['play.pokemonshowdown.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'play.pokemonshowdown.com',
        pathname: '/sprites/*',
        port: ''
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
