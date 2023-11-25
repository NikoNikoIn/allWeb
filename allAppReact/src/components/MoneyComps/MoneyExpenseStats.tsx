import React, { useEffect, useState, useRef, useContext } from 'react'
import Items from '../Items'
const { subtractList } = Items
import { CurrencyContext } from '../../contexts/CurrencyContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


const MoneyExpenseStats = ({money}: {money:any}) => {

    const initialExpenses = {
        'Bills': { total: 0, percentage: 0, color: '#B22222' },
        'Groceries': { total: 0, percentage: 0, color: '#8B0000' },
        'Food': { total: 0, percentage: 0, color: '#DC143C' },
        'Clothes': { total: 0, percentage: 0, color: '#FF4500' },
        'Leisure': { total: 0, percentage: 0, color: '#FF6347' },
        'Purchase': { total: 0, percentage: 0, color: '#FF7F50' },
        'Goals': { total: 0, percentage: 0, color: '#ff4e33' },
        'Other': { total: 0, percentage: 0, color: '#85605a' },
    }

    const initialMaxExpenses = {
        name: '',
        total: 0,
        percentage: 0,
        color: ''
    }

    const initialLeastExpenses = {
        name: '',
        total: 0,
        percentage: 0,
        color: ''
    }

    const [expenses, setExpenses] = useState(initialExpenses)
    const [maxExpense, setMaxExpense] = useState(initialMaxExpenses)
    const [leastExpense, setLeastExpense] = useState(initialLeastExpenses)

    const calculateExpenses = () => {
        let totalExpense = 0
        const newExpenses = { ...expenses }

        subtractList.forEach((purpose) => {
            const total = money.filter((moneySingle) => moneySingle.purpose === purpose)
                               .reduce((acc, curr) => acc + curr.amount, 0)
            totalExpense += total
            newExpenses[purpose].total = total
        })

        let currMax = Object.values(newExpenses)[0]
        let currLeast = Object.values(newExpenses)[0]

        for (const purpose in newExpenses) {
            newExpenses[purpose].percentage = (newExpenses[purpose].total / totalExpense) * 100
            if (newExpenses[purpose].total >= currMax.total) {
                currMax = newExpenses[purpose]
                currMax.name = purpose  
            }

            if (newExpenses[purpose].total <= currLeast.total && newExpenses[purpose].total > 0) {
                currLeast = newExpenses[purpose]
                currLeast.name = purpose  
            }
        }
        setMaxExpense(currMax)
        setLeastExpense(currLeast)
        setExpenses(newExpenses)
    }

    useEffect(() => {
        calculateExpenses()
    }, [money])

    useEffect(() => {
        subtractList.forEach((purpose) => {
            refs.current[purpose] = React.createRef()
        })
    }, [])

    const refs = useRef({})

    const [hoveredExpense, setHoveredExpense] = useState(null)

    const currencyContext = useContext(CurrencyContext)
    if (!currencyContext) {
        throw new Error('CurrencyContext not found. Make sure you have wrapped your component with CurrencyProvider')
    }
    const { currency } = currencyContext

    const handleMouseOver = (name: string, percentage: number, earn: number, e: React.MouseEvent, color: string, ref: React.MutableRefObject<any>) => {
        e.preventDefault()
        const boundingRect = ref.current.getBoundingClientRect()
        const tooltipX = boundingRect.left + boundingRect.width / 2
        const tooltipY = boundingRect.top + boundingRect.height / 2
        const content = (
            <div 
                className='progress-bar-hover' 
                style={{
                    position: 'absolute',
                    top: tooltipY - 25,
                    left: tooltipX,
                    transform: 'translate(-50%, -90%)',
                    border: `1px solid ${color}`,
                    borderRadius: '10px',
                    padding: '5px',
                    marginBottom: '5px',
                    zIndex: '4',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'var(--mainColor)',
                    width: 'auto',
                }}
            >
                <h6 style={{color:`${color}`}}>{name}</h6>
                <span>{percentage.toFixed(0)}% - {earn}{currency}</span>
            </div>
        )
        setHoveredExpense(content)
    }

    const [show, setShow] = useState(false)

    return (
        <div>
            <div className='progress-bar-container' style={{display: 'flex', alignContent: 'center'}}>
                {Object.entries(expenses).map(([purpose, { total, percentage, color }], index) => (
                    <div 
                        key={index}
                        ref={refs.current[purpose]}
                        className='progress-bar-money' 
                        onMouseOver={(e) => handleMouseOver(purpose, percentage, total, e, color, refs.current[purpose])} 
                        onMouseLeave={() => setHoveredExpense(null)} 
                        style={{width:`${percentage}%`, backgroundColor: color}}
                    />
                ))}
            </div>

            <div className='progress-bar-list'>
                {Object.entries(expenses).map(([purpose, { total, color }], index) => (
                    total ? (
                        <span key={index} style={{marginRight: '2%', display: 'flex', alignItems:'center'}}>
                            <div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor: color, marginRight:'2px'}}/>
                            {purpose}
                        </span>
                    ) : null
                ))}
            </div>
            {hoveredExpense}
            
            {leastExpense.total > 0 || maxExpense.total > 0 ? (
                <div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                            {maxExpense.total > 0 ? (
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <span>Most spent on: <span style={{color: maxExpense.color}}>{maxExpense.name}</span></span>
                                    <span>You've spent <span style={{color: maxExpense.color}}>{maxExpense.total}{currency}</span> on it</span>
                                    <span>It takes <span style={{color: maxExpense.color}}>{(maxExpense.percentage).toFixed(0)}%</span> of all the Expenses</span>
                                </div>
                            ) : (
                                null
                            )}

                            {leastExpense.total > 0 ? (
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <span>Least spent on: <span style={{color: leastExpense.color}}>{leastExpense.name}</span></span>
                                    <span>You've spent <span style={{color: leastExpense.color}}>{leastExpense.total}{currency}</span> on it</span>
                                    <span>It takes <span style={{color: leastExpense.color}}>{(leastExpense.percentage).toFixed(0)}%</span> of all the Expenses</span>
                                </div>
                            ) : (
                                null
                            )}

                        </div>
                </div>
            ) : null}

            <div className='money-table' style={{marginTop:'20px'}}>
                {show ? (
                    <>
                        <div className='money-expand-table subtract' onClick={() => setShow(!show)}>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                rotation={180}
                            /> Collapse
                        </div>
                        <table style={{width:'100%'}}>
                            <tr>
                                <th>Expense</th>
                                <th>Total</th>
                                <th>Percentage</th>
                            </tr>   
                            {Object.entries(expenses).map(([purpose, { total, percentage, color }], index) => (
                                total ? (
                                    <tr key={index}>
                                        <td style={{color:color}}>{purpose}</td>
                                        <td>{total}{currency}</td>
                                        <td>
                                            <div className='progress-bar-container'>
                                                <div className='progress-bar-money' style={{ display: 'flex', justifyContent: 'center', alignItems:'center', width: `${percentage}%`, backgroundColor: color }}>
                                                    <span style={{color:'var(--secondColor)'}}>{percentage.toFixed(0)}%</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null
                            ))}
                        </table>
                    </>
                ) : (
                    <div className='money-expand-table subtract off' onClick={() => setShow(!show)}>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                        /> Expand
                    </div>
                )}
            </div>
            
        </div>
    )
    
}

export default MoneyExpenseStats
