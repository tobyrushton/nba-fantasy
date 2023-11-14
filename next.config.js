/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.espncdn.com',
                port: '',
                pathname: '/i/headshots/nba/players/full/**'
            }
        ]
    }
}

module.exports = nextConfig
