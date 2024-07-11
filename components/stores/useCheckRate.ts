import { useConversionRateStore, CurrencyRate } from '@/components/stores/ratesStore'
import { useCallback, useEffect, useState } from 'react'
import { isCacheOutdated } from '@/lib/isCacheOutdated'

export const useCheckRate = () => {
	const {
		lastUpdated,
		currencyOne,
		currencyTwo,
		setCurrencyOneRate,
		currencyOneRates,
		setCurrencyOneRates,
		currencyTwoRates,
		setValidCurrencies,
	} = useConversionRateStore()
	const [isRatesLoading, setIsRatesLoading] = useState<boolean>(true)

	const getCurrencyOnePriceFromAPI = useCallback(async () => {
		try {
			const res = await fetch(`https://www.floatrates.com/daily/${currencyOne.toLowerCase()}.json`)
			const rates: Record<string, CurrencyRate> = await res.json()

			const localizedRates: CurrencyRate = rates[currencyTwo.toLowerCase()]
			const validCountries = Object.keys(rates)
			setValidCurrencies(validCountries)
			setCurrencyOneRate(localizedRates.rate)
			setCurrencyOneRates(rates)
		} catch (e) {
			console.log(e)
		}
	}, [currencyTwo, currencyOne])

	const updateCurrencyOneRateFromCache = useCallback(() => {
		if (!currencyOneRates) {
			throw new Error('Could not find cache of localized rates')
		}
		const localizedRates = currencyOneRates[currencyTwo.toLowerCase()]
		setCurrencyOneRate(localizedRates.rate)
	}, [currencyTwo, currencyOne, currencyOneRates])

	useEffect(() => {
		const getRate = async () => {
			setIsRatesLoading(true)
			// TODO use cache if available
			const isOutdated = isCacheOutdated(currencyOneRates, lastUpdated)

			if (isOutdated || (currencyOneRates && Object.keys(currencyOneRates).includes(currencyOne.toLowerCase()))) {
				await getCurrencyOnePriceFromAPI()
			} else {
				updateCurrencyOneRateFromCache()
			}
			setIsRatesLoading(false)
		}
		console.log('test')
		getRate()
	}, [currencyTwo, currencyOne, currencyOneRates])

	return { isRatesLoading }
}

// TODO properly handle currency 1 and currency 2. atm this wont use the caches correctly