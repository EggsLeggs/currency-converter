"use client"

import { Input } from "./ui/input"
import * as React from "react"

type currencyInputProps = {
    value: number | null
    currency: string
    currencySymbol: string
    onChange: (value: number | null) => void
    displayFixedDecimals?: number
}

export const CurrencyInput = ({ value, currency, currencySymbol, onChange, displayFixedDecimals }:currencyInputProps) => {
    const formatValue = React.useCallback((nextValue: number) => {
        if (typeof displayFixedDecimals === 'number') {
            return nextValue.toFixed(displayFixedDecimals)
        }
        return nextValue.toString()
    }, [displayFixedDecimals])

    const [inputValue, setInputValue] = React.useState<string>(value === null ? '' : formatValue(value))
    const [isFocused, setIsFocused] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (isFocused) {
            return
        }
        // Only sync from parent if the numeric value changed externally (e.g. other input changed)
        // Preserves in-progress strings like "10." or "10.0" while the user is still typing
        if (value === null) {
            if (inputValue !== '') {
                setInputValue('')
            }
            return
        }
        if (parseFloat(inputValue) !== value) {
            setInputValue(formatValue(value))
        }
    }, [value, inputValue, formatValue, isFocused])

    return(
        <div className="mt-auto">
            <span className='font-medium text-base'>
                <span className='pr-1.5 text-[0.7rem]'>
                    {currencySymbol}
                </span>
                {currency}
            </span>
            <Input
                min={0}
                type='number'
                value={inputValue}
                className='mt-0.5 font-medium text-base'
                inputMode="numeric"
                pattern='[0-9]*'
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false)
                    if (inputValue === '') {
                        onChange(0)
                        setInputValue(formatValue(0))
                    }
                }}
                onChange={(e) => {
                    const raw = e.target.value
                    setInputValue(raw)
                    if (raw === '') {
                        onChange(null)
                        return
                    }
                    const parsed = parseFloat(raw)
                    if (isNaN(parsed)) {
                        onChange(0)
                        return
                    }
                    onChange(parsed)
                }}
            />
        </div>
    )
}