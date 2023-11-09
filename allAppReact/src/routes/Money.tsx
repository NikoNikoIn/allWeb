import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../App.scss'
import '../styles/Money.scss'

import MoneyUpdate from '../components/MoneyUpdate'
import MoneyComponent from '../components/MoneyComponent'
import CurrencyButton from '../components/CurrencyButton'
import CurrencyProvider from '../contexts/CurrencyProvider'
import MoneyGraph from '../components/MoneyGraph'
import MoneyStats from '../components/MoneyStats'


const Money = () => {

    const [money, setMoney] = useState(() => {
        const savedMoney = localStorage.getItem('money')
        if (savedMoney) {
            return JSON.parse(savedMoney)
        } else {
            return []
        }
    })
 
    useEffect(() => {
        localStorage.setItem('money', JSON.stringify(money))
    }, [money])

    const [changeBackgroundColor, setChangeBackgroundColor] = useState('none')
    const [earnMoney, setEarnMoney] = useState(() => {
        const savedMoney = localStorage.getItem('earnMoney')
        return savedMoney ? JSON.parse(savedMoney) : 0
    })
    
    const [expenseMoney, setExpenseMoney] = useState(() => {
        const savedMoney = localStorage.getItem('expenseMoney')
        return savedMoney ? JSON.parse(savedMoney) : 0
    })

    useEffect(() => {
        localStorage.setItem('earnMoney', JSON.stringify(earnMoney))
    }, [earnMoney])
    
    useEffect(() => {
        localStorage.setItem('expenseMoney', JSON.stringify(expenseMoney))
    }, [expenseMoney])
    
    


    const addMoney = (moneySingle: any) => {
        const newMoney = [moneySingle, ...money]
        setMoney(newMoney)

        if (moneySingle.type === 'add') {
            setChangeBackgroundColor('add')
            setEarnMoney(prevMoney => prevMoney + moneySingle.amount)
            setTimeout(() => {
                setChangeBackgroundColor('none')
            }, 1200)
        } else if (moneySingle.type === 'subtract') {
            setChangeBackgroundColor('subtract')
            setExpenseMoney(prevMoney => prevMoney + moneySingle.amount)
            setTimeout(() => {
                setChangeBackgroundColor('none')
            }, 1200)
        }
    }

    const removeMoneySingle = (id: number) => {
        const moneySingle = money.find((item: any) => item.id === id)
        if (moneySingle) {
            if (moneySingle.type === 'add') {
                setEarnMoney(prevMoney => prevMoney - moneySingle.amount)
            } else if (moneySingle.type === 'subtract') {
                setExpenseMoney(prevMoney => prevMoney - moneySingle.amount)
            }
        }
        const removeArr = [...money].filter((item: any) => item.id !== id)
        setMoney(removeArr)
    }


    const [show, setShow] = useState('add')

    return (
        <CurrencyProvider>
            <div className={changeBackgroundColor === 'add' ? 'money-page add' : changeBackgroundColor === 'subtract' ? 'money-page subtract' : 'money-page'}>
                <CurrencyButton/>

                <div className='money-comp-wrap money-container'>
                    <div className='graph-div'>
                        <MoneyGraph earnMoney={earnMoney} expenseMoney={expenseMoney}/>
                    </div>
                    <div className='add-div'>
                        <MoneyUpdate onSubmit={addMoney}/>
                    </div>
                    <div className='display-div'>
                        <div style={{marginBottom:'20px', marginLeft:'15px'}}>
                            <span className={show==='add' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px'}} onClick={() => setShow('add')}>Earnings</span>
                            <span className={show==='subtract' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px'}} onClick={() => setShow('subtract')}>Expenses</span>
                            <span className={show==='stats' ? 'btn-menu active' : 'btn-menu'} onClick={() => setShow('stats')}>Statistics</span>
                        </div>
                        {show === 'add' ? (
                            <div className='money-scrollable'>
                                <Row>
                                   {money
                                    .filter((moneySingle: any) => moneySingle.type === 'add') 
                                    .map((moneySingle: any) => (
                                        <Col
                                            md={3}
                                            xs={12}
                                            key={`moneySingle-${moneySingle.id}`}
                                        >
                                            <MoneyComponent
                                                moneySingle={moneySingle}
                                                removeMoneySingle={removeMoneySingle}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ) : show === 'subtract' ? (
                            <div className='money-scrollable'>
                                <Row>
                                    {money
                                    .filter((moneySingle: any) => moneySingle.type === 'subtract') 
                                    .map((moneySingle: any) => (
                                        <Col
                                            md={3}
                                            xs={12}
                                            key={`moneySingle-${moneySingle.id}`}
                                        >
                                            <MoneyComponent
                                                moneySingle={moneySingle}
                                                removeMoneySingle={removeMoneySingle}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ) : (
                            <MoneyStats money={money}/>
                        )}

                    </div>
                </div>
            </div>
        </CurrencyProvider>
    )
}

export default Money
