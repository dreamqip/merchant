const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['cdn.sanity.io'],
        loader: 'custom'
    },
    eslint: {
        dirs: ['src/pages', 'src/components', 'src/context']
    },
    experimental: {
        legacyBrowsers: false,
        browsersListForSwc: true
    }
}

module.exports = withBundleAnalyzer(nextConfig)
