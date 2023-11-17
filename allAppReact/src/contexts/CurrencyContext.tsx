import React  from 'react'

type CurrencyContextType = {
    currency: string
    setCurrency: React.Dispatch<React.SetStateAction<string>>
}

export const CurrencyContext = React.createContext<CurrencyContextType | undefined>({
    currency: 'BYN',
    setCurrency: () => {},
})