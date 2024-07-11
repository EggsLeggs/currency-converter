import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CurrencyRate {
	code: string
	alphaCode: string
	numericCode: string
	name: string
	rate: number
	date: string
	inverseRate: number
}

interface BearState {
    lastUpdated: number | null
    currencyOneRate: number
    currencyOneRates: Record<string, CurrencyRate> | null
    setCurrencyOneRate: (by: number) => void
    setCurrencyOneRates: (currencyOneRates: Record<string, CurrencyRate>) => void
    currencyOne: string
    setCurrencyOne: (by: string) => void
    currencyTwoRates: Record<string, CurrencyRate> | null
    setCurrencyTwoRates: (currencyTwoRates: Record<string, CurrencyRate>) => void
    currencyTwo: string
    validCurrencies: string[]
    setValidCurrencies: (by: string[]) => void
}

export const useConversionRateStore = create<BearState>()(
	devtools(
		persist(
			(set) => ({
                lastUpdated: null,
                currencyOneRate: 0.0048,
                currencyOneRates: null,
                setCurrencyOneRate: (by) => set(() => ({ currencyOneRate: by, lastUpdated: new Date().getTime() })),
                setCurrencyOneRates: (by) => set(() => ({ currencyOneRates: by })),
                currencyOne: 'JPY',
                setCurrencyOne: (by) => set(() => ({ currencyOne: by })),
                currencyTwoRates: null,
                setCurrencyTwoRates: (by) => set(() => ({ currencyTwoRates: by })),
                currencyTwo: 'GBP',
                validCurrencies: [],
                setValidCurrencies: (by) => set(() => ({ validCurrencies: by }))
			}),
			{
				name: 'rate-storage',
			},
		),
	),
)