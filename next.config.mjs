/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'multi.alexreactapp.ru'
            }]
    }
};

export default nextConfig;
