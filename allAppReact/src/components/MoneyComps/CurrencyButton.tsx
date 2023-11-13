import { useEffect, useContext } from 'react'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import Items from '../Items'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const { currencyList } = Items

const CurrencyButton = () => {
    const { currency, setCurrency } = useContext(CurrencyContext)

    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currency))
    }, [currency])

    const handleClick = (type: string) => {
        const currentIndex = currencyList.findIndex((item) => item === currency)

        if (type === 'right') {
            const nextIndex = (currentIndex + 1) % currencyList.length
            setCurrency(currencyList[nextIndex])
        } else if (type === 'left') {
            const prevIndex = (currentIndex - 1 + currencyList.length) % currencyList.length
            setCurrency(currencyList[prevIndex])
        }
    }

    return (
        <div className='currency-button'>
            <FontAwesomeIcon
                size='xl'
                onClick={() => handleClick('right')}
                className='currency-left'
                icon={faChevronLeft}
            />
            <div className='currency-item'>{currency}</div>
            <FontAwesomeIcon
                size='xl'
                onClick={() => handleClick('left')}
                className='currency-right'
                rotation={180}
                icon={faChevronLeft}
            />
        </div>
    )
}

export default CurrencyButton