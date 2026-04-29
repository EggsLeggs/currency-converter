"use client"

import { Input } from "./ui/input"
import * as React from "react"

type currencyInputProps = {
    value: number
    currency: string
    currencySymbol: string
    onChange: (value: number) => void
}

export const CurrencyInput = ({ value, currency, currencySymbol, onChange }:currencyInputProps) => {
    const [inputValue, setInputValue] = React.useState<string>(value.toString())

    React.useEffect(() => {
        // Only sync from parent if the numeric value changed externally (e.g. other input changed)
        // Preserves in-progress strings like "10." or "10.0" while the user is still typing
        if (parseFloat(inputValue) !== value) {
            setInputValue(value.toString())
        }
    }, [value])

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
                onChange={(e) => {
                    const raw = e.target.value
                    setInputValue(raw)
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