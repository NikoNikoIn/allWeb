import React from 'react'
import '../App.scss'
import '../styles/Money.scss'


function MoneyComponent({moneySingle, removeMoneySingle}) {
    return (
        <div>
            <p onClick={() => removeMoneySingle(moneySingle.id)}>{moneySingle.amount}</p>
            <p>{moneySingle.type}</p>
            <p>{moneySingle.date}</p>
            <p>{moneySingle.currency}</p>
        </div>
    )
}

export default MoneyComponent
