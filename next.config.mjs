/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FOOD_RECIPE_API_KEY: process.env.FOOD_RECIPE_API_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'www.foodsafetykorea.go.kr',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
