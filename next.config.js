/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'currency-converter'

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: !isProd,
})

module.exports = withPWA({
	reactStrictMode: true,
	output: 'export',
	basePath: isProd ? `/${repoName}` : '',
	assetPrefix: isProd ? `/${repoName}/` : '',
	images: {
		unoptimized: true,
	},
})
