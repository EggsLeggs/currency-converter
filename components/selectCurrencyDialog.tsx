import { useConversionRateStore } from "./stores/ratesStore"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { code } from "currency-codes"
import * as React from 'react'

type selectCurrencyDialogProps = {
    header: string
    currentCurrency: string
    setCurrency: (currency: string) => void
}

export const SelectCurrencyDialog = ({header, currentCurrency, setCurrency}:selectCurrencyDialogProps) => {
    const { currencyOne, currencyTwo, validCurrencies } = useConversionRateStore()

    const otherCurrency = currentCurrency === currencyOne ? currencyTwo : currencyOne

    const [countryQuery, setCountryQuery] = React.useState<string>('')

    // TODO: implement the ability to select money of the same currency, this will require a change in the store cause the api doesnt include the same currency in the list
    const unselectedCurrencies = validCurrencies.filter((currency) => currency.toUpperCase() !== currencyOne && currency.toUpperCase() !== currencyTwo)
    const filteredCurrencies = unselectedCurrencies.filter((currency) =>
        code(currency)?.currency.toUpperCase().includes(countryQuery.toUpperCase()) || currency.toUpperCase().includes(countryQuery.toUpperCase())
    )

	const countryListContainer = React.useRef<HTMLDivElement | null>(null)

    return (
        <DialogContent className='sm:h-auto h-[100svh] sm:w-auto w-full'>
            <div className='mx-auto max-w-sm p-2'>
                <DialogHeader className='space-y-1'>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogDescription>
                        Select currency to compare to the {code(otherCurrency)?.currency || otherCurrency} price
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4  py-4">
                <Input
                    className='text-lg'
                    placeholder='Search for a currency...'
                    value={countryQuery}
                    onChange={(e) => {
                    	const value = e.currentTarget.value
                    	setCountryQuery(value)

                    	if (countryListContainer.current) {
                    		countryListContainer.current.scrollTop = 0
                    	}
                    }}
                />
                <ul className='w-[100%]'>
                    <ScrollArea
                        className='sm:h-96 h-[77svh] w-[100%] rounded-md border'
                    >
                        {filteredCurrencies.map((currency, idx) => (
                            <li key={currency} className='w-[100%]'>
                                <DialogClose asChild>
                                    <Button
                                        onClick={() => {
                                            setCountryQuery('')
                                            setCurrency(currency.toUpperCase())
                                        }}
                                        size='lg'
                                        variant='ghost'
                                        className='rounded-none w-[100%]  justify-start px-4 font-medium text-base'
                                    >
                                        <span className='pr-1.5 text-[0.7rem]'>
                                            {currency}
                                        </span>
                                        {code(currency)?.currency || currency}
                                    </Button>
                                </DialogClose>
                                {idx < validCurrencies.length - 1 && <Separator />}
                            </li>
                        ))}
                    </ScrollArea>
                </ul>
                </div>
            </div>
        </DialogContent>
    )
}