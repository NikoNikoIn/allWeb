import React, { useState, useEffect, useContext } from 'react'
import '../App.scss'
import '../styles/Money.scss'
import { CurrencyContext } from '../contexts/CurrencyContext'


const MoneyComponent = ({ moneySingle, removeMoneySingle }) => {

    const { currency } = useContext(CurrencyContext)


    return (
        <div className='money-component'>
            <p onClick={() => removeMoneySingle(moneySingle.id)}>
                {moneySingle.amount} - {currency}
            </p>
            <p>{moneySingle.type}</p>
            <p>{moneySingle.date}</p>
        </div>
    )
}


export default MoneyComponent
