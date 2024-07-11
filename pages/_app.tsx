import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import Head from 'next/head'
import Appbar from '@/components/appbar'
import { Analytics } from "@vercel/analytics/react"

export const satoshi = localFont({
	src: '../fonts/Satoshi-Variable.ttf',
	variable: '--font-satoshi',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
				/>

				<title>Simple Currency Converter</title>
				<link rel='icon' type='image/png' href='/images/favicon.png' />
				<meta
					name='theme-color'
					content='#18181b'
					media='(prefers-color-scheme: dark)'
				/>
				<meta name='theme-color' content='#f4f4f5' />
				<link rel='apple-touch-icon' href='/images/icon-maskable-512.png' />
				<link rel='manifest' href='/manifest.json' />

				<meta property='og:url' content='https://currency.amory.me/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Simple Currency Converter' />
				<meta
					property='og:description'
					content='A simple currency converter for your daily needs.'
				/>
				{/* <meta property='og:image' content='' />
				<meta name='twitter:card' content='summary_large_image' /> */}
				<meta property='twitter:domain' content='currency.amory.me' />
				<meta property='twitter:url' content='https://currency.amory.me/' />
				<meta name='twitter:title' content='Simple Currency Converter' />
				<meta
					name='twitter:description'
					content='A simple currency converter for your daily needs.'
				/>
				{/* <meta name='twitter:image' content='' /> */}
			</Head>
			<div className={`${satoshi.variable} font-sans `}>
				<Appbar />
				<main className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'>
					<div className='p-6'>
						<Component {...pageProps} />
					</div>
				</main>
			</div>
			<Analytics />
		</ThemeProvider>
	)
}
