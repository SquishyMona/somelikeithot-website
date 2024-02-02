/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                path: '/v0/b/slihnextwebsite.appspot.com/o/*',
            }
        ]
    }
};

export default nextConfig;
