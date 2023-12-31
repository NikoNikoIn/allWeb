import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import '../App.scss'
import '../styles/Money.scss'

import MoneyUpdate from '../components/MoneyComps/MoneyUpdate'
import MoneyComponent from '../components/MoneyComps/MoneyComponent'
import CurrencyButton from '../components/MoneyComps/CurrencyButton'
import MoneyGraph from '../components/MoneyComps/MoneyGraph'
import MoneyStats from '../components/MoneyComps/MoneyStats'
import MoneyGoals from '../components/MoneyComps/MoneyGoals'

import CurrencyProvider from '../contexts/CurrencyProvider'


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
            setEarnMoney((prevMoney: number) => prevMoney + moneySingle.amount)
            setTimeout(() => {
                setChangeBackgroundColor('none')
            }, 1200)
        } else if (moneySingle.type === 'subtract') {
            setChangeBackgroundColor('subtract')
            setExpenseMoney((prevMoney: number) => prevMoney + moneySingle.amount)
            setTimeout(() => {
                setChangeBackgroundColor('none')
            }, 1200)
        }
    }

    const removeMoneySingle = (id: number) => {
        const moneySingle = money.find((item: any) => item.id === id)
        if (moneySingle) {
            if (moneySingle.type === 'add') {
                setEarnMoney((prevMoney: number) => prevMoney - moneySingle.amount)
            } else if (moneySingle.type === 'subtract') {
                setExpenseMoney((prevMoney: number) => prevMoney - moneySingle.amount)
            }
        }
        const removeArr = [...money].filter((item: any) => item.id !== id)
        setMoney(removeArr)
    }


    const [show, setShow] = useState('add')

    return (
        <CurrencyProvider>
            <div className={changeBackgroundColor === 'add' ? 'money-page add' : changeBackgroundColor === 'subtract' ? 'money-page subtract' : 'money-page'} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'10px'}}>
                <CurrencyButton/>
                <div className='general-money-wrapper' style={{display:'flex', flexDirection:'column', width:'80%', justifyContent:'flex-start', height:'auto'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', width:'100%', height:'auto'}}> 
                        <MoneyGraph earnMoney={earnMoney} expenseMoney={expenseMoney}/>
                        <MoneyUpdate onSubmit={addMoney}/>
                    </div>
                    <br/>
                    <div style={{display:'flex', flexDirection:'column'}}> 
                        <div style={{marginBottom:'20px', marginLeft:'15px'}}>
                            <span className={show==='add' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px'}} onClick={() => setShow('add')}>Earnings</span>
                            <span className={show==='subtract' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px'}} onClick={() => setShow('subtract')}>Expenses</span>
                            <span className={show==='stats' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px'}} onClick={() => setShow('stats')}>Statistics</span>
                            <span className={show==='goals' ? 'btn-menu active' : 'btn-menu'} onClick={() => setShow('goals')}>Goals</span>
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
                        ) : show === 'stats' ? (
                            <MoneyStats money={money}/>
                        ) : show === 'goals' ? (
                            <MoneyGoals money={money} earnMoney={earnMoney} expenseMoney={expenseMoney} setEarnMoney={setEarnMoney} onSubmit={addMoney}/>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        </CurrencyProvider>
    )
}

export default Money
