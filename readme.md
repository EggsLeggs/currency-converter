<p align="center">
	<img alt="Currency Converter" src="public/images/icon-512.png" width="90">
	<h2 align="center">Currency Converter</h2>
</p>

<p align="center">A fast, offline-capable currency converter PWA</p>

<p align="center">
	<a href="https://eggsleggs.github.io/currency-converter">Live demo</a>
</p>

<p align="center">
	<a href="https://github.com/EggsLeggs/currency-converter/actions/workflows/deploy.yml">
		<img alt="Deploy status" src="https://github.com/EggsLeggs/currency-converter/actions/workflows/deploy.yml/badge.svg" />
	</a>
</p>

## Features

- Real-time currency conversion
- Offline support via PWA / service worker
- Light and dark themes
- Native-like mobile experience

## Getting started

```bash
pnpm install
pnpm dev
```

## Deployment

The app is statically exported and deployed to GitHub Pages automatically on every push to `main` via GitHub Actions.

To enable GitHub Pages for the repo:

1. Go to **Settings > Pages**
2. Set **Source** to **GitHub Actions**

The live site will be available at `https://eggsleggs.github.io/currency-converter`.

## Tech stack

- [Next.js](https://nextjs.org) (static export)
- [Tailwind CSS](https://tailwindcss.com)
- [next-pwa](https://github.com/shadowwalker/next-pwa) for offline support
- [next-themes](https://github.com/pacocoursey/next-themes) for theming
