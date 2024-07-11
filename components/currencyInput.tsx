"use client"

import { Input } from "./ui/input"
import * as React from "react"

type currencyInputProps = {
    value: number
    currency: string
    currencySymbol: string
    onChange: (value: number) => void
}

function isZeroValue(value: string) {
    return value.length === 2 && value[0] === '0' && value[1] !== '.'
}

export const CurrencyInput = ({ value, currency, currencySymbol, onChange }:currencyInputProps) => {
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
                value={isZeroValue(value.toString())? value.toString()[1]: value.toString()}
                className='mt-0.5 font-medium text-base'
                inputMode="numeric"
                pattern='[0-9]*'
                onChange={(e) => {
                    const value = parseFloat(e.target.value)
                    if (isNaN(value)) {
                        onChange(0)
                        return
                    }
                    onChange(value)
                }}
            />
        </div>
    )
}