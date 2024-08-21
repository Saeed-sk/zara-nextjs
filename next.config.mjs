/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // IMAGE_DIRECTORY : 'http://127.0.0.1:8000/',
        API_PATH : 'http://127.0.0.1:8000/api',
        NEXT_PUBLIC_API_BASE_URL : 'http://localhost:8000'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            }
        ],
    },
};

export default nextConfig;
