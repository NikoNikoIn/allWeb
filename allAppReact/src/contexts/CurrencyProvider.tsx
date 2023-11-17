import { useState, useEffect } from 'react'
import { CurrencyContext } from './CurrencyContext'

const CurrencyProvider = ({ children } : {children: string}) => {
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency')
        return savedCurrency ? JSON.parse(savedCurrency) : 'BYN'
    })
    
    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currency))
    }, [currency])
    
    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider
