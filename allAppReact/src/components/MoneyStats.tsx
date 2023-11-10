import React, {useState, useEffect} from 'react'


import MoneyExpenseStats from './MoneyStatsComps/MoneyExpenseStats'
import MoneyEarnStats from './MoneyStatsComps/MoneyEarnStats'


const MoneyStats = ({money}) => {




    return (
        <div className='add-wrapper'>
            <div className='add-content'>
                <h2>Your Stats</h2>
                <h3>Earnings</h3>
                <MoneyEarnStats money={money} />
                <h3>Expenses</h3>
                <MoneyExpenseStats money={money} />
            </div>

        </div>
    )
}

export default MoneyStats
