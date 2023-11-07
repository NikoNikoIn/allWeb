import React, {useState, useEffect} from 'react'

const MoneyGraph = ({ earnMoney, expenseMoney }) => {
    const [earnPercent, setEarnPercent] = useState(0)
    const [expensePercent, setExpensePercent] = useState(0)

    useEffect(() => {
        const maxMoney = Math.max(earnMoney, expenseMoney)
        setEarnPercent((earnMoney / maxMoney) * 100)
        setExpensePercent((expenseMoney / maxMoney) * 100)
    }, [earnMoney, expenseMoney])

    return (
        <div className='graph-wrapper'>
            <div>
                <div className='graph-show expenses' style={{width: expensePercent === 0 ? `0` : `${expensePercent}%`}}>

                </div>
                <div className='graph-show earnings' style={{width: earnPercent === 0 ? `0` : `${earnPercent}%`}}>

                </div>
            </div>

            <div>
                {earnMoney} - {expenseMoney}
            </div>
        </div>
    )
}

export default MoneyGraph
