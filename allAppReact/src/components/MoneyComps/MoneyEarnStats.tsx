import React, { useEffect, useState, useRef, useContext } from 'react'
import Items from '../Items'
const { addList } = Items
import { CurrencyContext } from '../../contexts/CurrencyContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


const MoneyEarnStats = ({money}) => {

    const initialEarnings = {
        'Salary': { total: 0, percentage: 0, color: '#67b528' },
        'Passive income': { total: 0, percentage: 0, color: '#50ba70' },
        'Side pay': { total: 0, percentage: 0, color: '#92de54' },
        'Selling': { total: 0, percentage: 0, color: '#9ffa43' },
        'Other way': { total: 0, percentage: 0, color: '#9ab584' },
    }

    const initialMaxEarn = {
        name: '',
        total: 0,
        percentage: 0,
        color: ''
    }

    const initialLeastEarn = {
        name: '',
        total: 0,
        percentage: 0,
        color: ''
    }

    const [earnings, setEarnings] = useState(initialEarnings)
    const [maxEarn, setMaxEarn] = useState(initialMaxEarn)
    const [leastEarn, setLeastEarn] = useState(initialLeastEarn)

    const calculateEarnings = () => {
        let totalEarn = 0
        const newEarnings = { ...earnings }

        addList.forEach((purpose) => {
            const total = money.filter((moneySingle) => moneySingle.purpose === purpose)
                               .reduce((acc, curr) => acc + curr.amount, 0)
            totalEarn += total
            newEarnings[purpose].total = total
        })

        let currMax = Object.values(newEarnings)[0]
        let currLeast = Object.values(newEarnings)[0]

        for (const purpose in newEarnings) {
            newEarnings[purpose].percentage = (newEarnings[purpose].total / totalEarn) * 100

            if (newEarnings[purpose].total >= currMax.total) {
                currMax = newEarnings[purpose]
                currMax.name = purpose  
            }

            if (newEarnings[purpose].total <= currLeast.total && newEarnings[purpose].total > 0) {
                currLeast = newEarnings[purpose]
                currLeast.name = purpose  
            }
        }

        setMaxEarn(currMax)
        setLeastEarn(currLeast)
        setEarnings(newEarnings)
    }

    useEffect(() => {
        calculateEarnings()
    }, [money])

    useEffect(() => {
        addList.forEach((purpose) => {
            refs.current[purpose] = React.createRef()
        })
    }, [])

    const refs = useRef({})

    const [hoveredEarn, setHoveredEarn] = useState(null)

    const { currency } = useContext(CurrencyContext)


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
                    alignItems: 'center'
                    
                }}
            >
                <h6 style={{color:`${color}`}}>{name}</h6>
                <span>{percentage.toFixed(0)}% - {earn}{currency}</span>
            </div>
        )
        setHoveredEarn(content)
    }

    const [show, setShow] = useState(false)

    return (
        <div>
            <div className='progress-bar-container' style={{display: 'flex', alignContent: 'center'}}>
                {Object.entries(earnings).map(([purpose, { total, percentage, color }], index) => (
                    <div 
                        key={index}
                        ref={refs.current[purpose]}
                        className='progress-bar-money' 
                        onMouseOver={(e) => handleMouseOver(purpose, percentage, total, e, color, refs.current[purpose])} 
                        onMouseLeave={() => setHoveredEarn(null)} 
                        style={{width:`${percentage}%`, backgroundColor: color}}
                    />
                ))}
            </div>
            <div className='progress-bar-list'>
                {Object.entries(earnings).map(([purpose, { total, color }], index) => (
                    total ? (
                        <span key={index} style={{marginRight: '2%', display: 'flex', alignItems:'center'}}>
                            <div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor: color, marginRight:'2px'}}/>
                            {purpose}
                        </span>
                    ) : null
                ))}
            </div>
            {hoveredEarn}

            {leastEarn.total > 0 || maxEarn.total > 0 ? (
                    <div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                            {maxEarn.total > 0 ? (
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <span>Most earned from: <span style={{color: maxEarn.color}}>{maxEarn.name}</span></span>
                                    <span>You've earned <span style={{color: maxEarn.color}}>{maxEarn.total}{currency}</span> by this method</span>
                                    <span>It takes <span style={{color: maxEarn.color}}>{(maxEarn.percentage).toFixed(0)}%</span> of all the Earnings</span>
                                </div>
                            ) : (
                                null
                            )}

                            {leastEarn.total > 0 ? (
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <span>Least earned from: <span style={{color: leastEarn.color}}>{leastEarn.name}</span></span>
                                    <span>You've earned <span style={{color: leastEarn.color}}>{leastEarn.total}{currency}</span> by this method</span>
                                    <span>It takes <span style={{color: leastEarn.color}}>{(leastEarn.percentage).toFixed(0)}%</span> of all the Earnings</span>
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
                        <div className='money-expand-table earn' onClick={() => setShow(!show)}>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                rotation={180}
                            /> Collapse
                        </div>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Earning</th>
                                    <th>Total</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(earnings).map(([purpose, { total, percentage, color }], index) => (
                                    total ? (
                                        <tr key={index}>
                                            <td style={{ color: color }}>{purpose}</td>
                                            <td>{total}{currency}</td>
                                            <td>
                                                <div style={{ width: '100%', overflow: 'hidden', backgroundColor: '#c2c2c2', borderRadius: '15px' }}>
                                                    <span style={{ display: 'flex', justifyContent: 'center', width: `${percentage}%`, backgroundColor: color }}><span style={{color:'var(--mainColor)'}}>{percentage.toFixed(0)}%</span></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className='money-expand-table earn off' onClick={() => setShow(!show)}>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                        /> Expand
                    </div>
                )}
                
            </div>

        </div>
    )
    
    
}

export default MoneyEarnStats
