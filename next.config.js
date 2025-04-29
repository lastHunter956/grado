/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enable custom JSX pragma
    react: {
      runtime: 'automatic'
    }
  }
}

module.exports = nextConfig
