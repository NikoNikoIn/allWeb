import React, { useState, useEffect, useContext } from 'react'
import '../App.scss'
import '../styles/Money.scss'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'


const MoneyComponent = ({ moneySingle, removeMoneySingle }) => {

    const { currency } = useContext(CurrencyContext)


    return (
        <div className='money-component'>
            <span className='money-amount'>
                {moneySingle.amount}{currency} 
                <FontAwesomeIcon 
                    className='money-trend' 
                    style={{
                        color: moneySingle.type === 'add' ? '#3dc257' : '#c40606',
                        marginLeft: '10px'
                    }} 
                    icon={moneySingle.type === 'add' ? faArrowTrendUp : faArrowTrendDown}
                />
            </span>

            <FontAwesomeIcon icon={faXmark} className='money-cancel'
                onClick={() => removeMoneySingle(moneySingle.id)}
            />
            <br/>
            <span>____</span>
            <span>{moneySingle.date}</span>
        </div>
        
    )
}


export default MoneyComponent
