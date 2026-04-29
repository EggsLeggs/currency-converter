/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const normalizedBasePath =
	basePath && basePath !== '/' ? `/${basePath.replace(/^\/|\/$/g, '')}` : ''

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: !isProd,
})

module.exports = withPWA({
	reactStrictMode: true,
	output: 'export',
	basePath: isProd ? normalizedBasePath : '',
	assetPrefix: isProd && normalizedBasePath ? `${normalizedBasePath}/` : '',
	images: {
		unoptimized: true,
	},
})
