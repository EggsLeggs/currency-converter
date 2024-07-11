import { useConversionRateStore } from "./stores/ratesStore"

export const SelectCurrencyButton = () => {
    const { currencyOne, currencyTwo, validCurrencies } = useConversionRateStore()

    return (
        <div className='flex rounded-md text-xs font-semibold border border-input cursor-pointer bg-background '>
        <div className='py-2 px-4 hover:bg-accent rounded-l-md'>
            {currencyOne}
        </div>
        <div className='border-l border-input py-2 px-4 hover:bg-accent rounded-r-md'>
            {currencyTwo}
        </div>
    </div>
    )
}