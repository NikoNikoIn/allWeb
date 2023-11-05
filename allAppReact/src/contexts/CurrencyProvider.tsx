import React, { useState, useEffect } from 'react'
import { CurrencyContext } from './CurrencyContext'

const CurrencyProvider = ({ children }) => {
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
