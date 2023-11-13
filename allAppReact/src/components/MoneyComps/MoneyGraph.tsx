import React, {useState, useEffect, useContext} from 'react'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'


const MoneyGraph = ({ earnMoney, expenseMoney }) => {
    const [earnPercent, setEarnPercent] = useState(0)
    const [expensePercent, setExpensePercent] = useState(0)

    useEffect(() => {
        if (earnMoney === 0 && expenseMoney === 0) {
            setEarnPercent(0)
            setExpensePercent(0)
        } else {
            const maxMoney = Math.max(earnMoney, expenseMoney)
            
            setEarnPercent((earnMoney / maxMoney) * 100)
            setExpensePercent((expenseMoney / maxMoney) * 100)
        }
    }, [earnMoney, expenseMoney])

    const { currency } = useContext(CurrencyContext)

    return (
        
        <div className='graph-wrapper'>
            <h2 style={{padding:'2%', marginBottom:'4vh'}}>Graph Visualised</h2>
            <div className='graph-flex'>
                {earnMoney === 0 && expenseMoney === 0 ? (
                    null
                ) : (
                    <>
                        <div className='graph-text expenses'><div className='graph-icon expenses'/> Expenses</div> 
                        <div className='graph-text subtract'>{expenseMoney}{currency}</div> 
                        <div className='graph-show expenses' style={{width: `${expensePercent}%`, marginBottom:`2px`}}>
                        </div>
        
                        <div className='graph-text earnings'><div className='graph-icon earnings'/> Earnings</div> 
                        <div className='graph-text add'>{earnMoney}{currency}</div> 
        
                        <div className='graph-show earnings' style={{width: `${earnPercent}%`}}>
                        </div>
                    </>
                )}

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '2%', paddingTop: '6%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ color: earnMoney - expenseMoney > 0 ? '#3dc257' : earnMoney - expenseMoney < 0 ? '#c40606' : '#949494' }}>
                        {earnMoney - expenseMoney}
                        {currency}
                    </h3>
                    <span style={{ marginTop: '-10px', fontSize: '12px', color: '#949494' }}>Balance</span>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    {earnMoney - expenseMoney > 0 && expenseMoney !== 0 ? (
                        <span>
                            <FontAwesomeIcon icon={faArrowUp} style={{ color: '#4287f5' }} />{' '}
                            {((earnMoney - expenseMoney) / expenseMoney * 100).toFixed(1)}%
                        </span>
                    ) : earnMoney - expenseMoney < 0 && earnMoney !== 0 ? (
                        <span>
                            <FontAwesomeIcon icon={faArrowUp} rotation={180} style={{ color: '#c40606' }} />{' '}
                            {((earnMoney - expenseMoney) / expenseMoney * 100).toFixed(1)}%
                        </span>
                    ) : (
                        null
                    )}
                </div>
            </div>


        </div>
    )
}

export default MoneyGraph
