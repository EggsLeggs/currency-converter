"use client"

import { Card } from '@/components/ui/card'
import { Coins } from 'lucide-react'
import { CurrencyInput } from '@/components/currencyInput'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/divider'
import { useCheckRate } from '@/components/stores/useCheckRate'
import { useConversionRateStore } from '@/components/stores/ratesStore'
import { Skeleton } from './ui/skeleton'
import { code } from 'currency-codes'
import * as React from 'react'

export const Converter = () => {

    const { currencyOneRate, lastUpdated, currencyOne, currencyTwo } = useConversionRateStore()

    const { isRatesLoading } = useCheckRate()

    const [currencyOneValue, setCurrencyOneValue] = React.useState<number | null>(1)
    const [currencyTwoValue, setCurrencyTwoValue] = React.useState<number | null>(parseFloat((1 * currencyOneRate).toFixed(2)))
    const [lastEdited, setLastEdited] = React.useState<'currencyOne' | 'currencyTwo'>('currencyOne')

    if (isRatesLoading) {
		return (
            <Card className='p-6 space-y-4'>
                <div className='flex flex-col items-center justify-center'>
                    <Skeleton className='h-[350px] md:w-full w-[100%] base rounded-xl' />
                </div>
            </Card>
		)
	}

    const onChangeCurrencyOne = (value: number | null) => {
        setLastEdited('currencyOne')
        if (value === null) {
            setCurrencyOneValue(null)
            setCurrencyTwoValue(null)
            return
        }
        setCurrencyOneValue(value)
        setCurrencyTwoValue(parseFloat((value * currencyOneRate).toFixed(2)))
    }

    const onChangeCurrencyTwo = (value: number | null) => {
        setLastEdited('currencyTwo')
        if (value === null) {
            setCurrencyTwoValue(null)
            setCurrencyOneValue(null)
            return
        }
        setCurrencyTwoValue(value)
        setCurrencyOneValue(parseFloat((value / currencyOneRate).toFixed(2)))
    }

    const onClearConversion = () => {
        setLastEdited('currencyOne')
        setCurrencyOneValue(0)
        setCurrencyTwoValue(0)
    }

    return (
        <Card className='p-6 space-y-4'>
        <h2 className='text-xl font-semibold'>
            {code(currencyOne)?.currency || currencyOne} to {code(currencyTwo)?.currency || currencyTwo} Converter
        </h2>
        <div className='grid grid-cols-2 gap-4'>
            {/* TODO focus on this input when page loads */}
            <CurrencyInput value={currencyOneValue} currency={code(currencyOne)?.currency || currencyOne} currencySymbol={currencyOne} onChange={onChangeCurrencyOne} displayFixedDecimals={lastEdited === 'currencyTwo' ? 2 : undefined}/>
            <CurrencyInput value={currencyTwoValue} currency={code(currencyTwo)?.currency || currencyTwo} currencySymbol={currencyTwo} onChange={onChangeCurrencyTwo} displayFixedDecimals={lastEdited === 'currencyOne' ? 2 : undefined}/>
        </div>
        <Button className='w-full text-base font-semibold' onClick={onClearConversion}>
            Clear
        </Button>
        <Divider />
        <Card className='p-4 flex items-center gap-x-4'>
            <Coins className='h-8 w-8' />
            <div>
                <p className='text-sm font-semibold'>
                    1 {currencyOne} = {currencyOneRate.toFixed(4)} {currencyTwo}
                </p>
                <p className='text-xs text-muted-foreground font-medium flex gap-2 items-center'>
                    Updated {
                        lastUpdated ? new Date(lastUpdated).toLocaleString('en-US') : 
                        <Skeleton className='w-20 h-3' />
                    }
                </p>
            </div>
        </Card>
    </Card>
    )
}