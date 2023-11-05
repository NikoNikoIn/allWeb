import { useState, useEffect, useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'
import Items from './Items'


const { currencyList } = Items

const CurrencyButton = () => {
    const { currency, setCurrency } = useContext(CurrencyContext)

    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currency))
    }, [currency])

    const currencyItems = currencyList.map((item) => (
        <li
            key={item.name}
            className='dropdown-item'
            onClick={() => {
                setCurrency(item.sign)
            }}
        >
            <span>{item.name} - {item.sign}</span>
        </li>
    ))

    return (
        <div className='currency-button'>
            <div>
                <button
                    className='currency-dropdown'
                    type='button'
                    id='currencyDropdown'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    {currency}
                </button>
                <ul className='dropdown-menu' aria-labelledby='currencyDropdown'>
                    {currencyItems}
                </ul>
            </div>
        </div>
    )
}

export default CurrencyButton