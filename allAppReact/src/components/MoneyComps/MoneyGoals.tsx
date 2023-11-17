import React, {useState, useEffect} from 'react'


import MoneyGoalCreate from './MoneyGoalCreate'


const MoneyGoals = ({money}: {money: any}) => {
    return (
        <div className='add-wrapper'>
            <div className='general-money-wrapper'>
                <h3>Your Goals</h3>
                <MoneyGoalCreate />
            </div>
        </div>
    )
}

export default MoneyGoals
