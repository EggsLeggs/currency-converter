import { SelectCurrencyDialog } from "./selectCurrencyDialog"
import { useConversionRateStore } from "./stores/ratesStore"
import { Dialog, DialogTrigger } from "./ui/dialog"

export const SelectCurrencyButton = () => {
    const { currencyOne, currencyTwo, setCurrencyOne, setCurrencyTwo } = useConversionRateStore()

    return (
        <div className='flex rounded-md text-xs font-semibold border border-input cursor-pointer bg-background '>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='py-2 px-4 hover:bg-accent rounded-l-md'>
                        {currencyOne}
                    </div>
                </DialogTrigger>
                <SelectCurrencyDialog
                    header="Convert from Currency"
                    currentCurrency={currencyOne}
                    setCurrency={setCurrencyOne}
                />
            </Dialog>
            <Dialog>
            <DialogTrigger asChild>
                <div className='border-l border-input py-2 px-4 hover:bg-accent rounded-r-md'>
                    {currencyTwo}
                </div>
            </DialogTrigger>
                <SelectCurrencyDialog
                    header="Convert to Currency"
                    currentCurrency={currencyTwo}
                    setCurrency={setCurrencyTwo}
                />
            </Dialog>
        </div>
    )
}