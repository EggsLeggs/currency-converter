import { InfoIcon } from 'lucide-react'
import Link from 'next/link'
import { SelectCurrencyButton } from './selectCurrencyButton'

const Appbar = () => {

	return (
		<div className='fixed top-0 left-0 z-20 w-full pt-safe'>
			<header className='border-b px-safe dark:border-zinc-800'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link href='/'>
						<h1 className='font-medium'>Currency Converter Tool</h1>
					</Link>

					<nav className='flex items-center space-x-6'>
						<SelectCurrencyButton />
						<Link href='/about'>
							<InfoIcon className='h-5 w-5' />
						</Link>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
