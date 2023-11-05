import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../App.scss'
import '../styles/Money.scss'

import MoneyUpdate from '../components/MoneyUpdate'
import MoneyComponent from '../components/MoneyComponent'
import CurrencyButton from '../components/CurrencyButton'
import CurrencyProvider from '../contexts/CurrencyProvider'



function Money() {

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

    const addMoney = (moneySingle:any) => {
        const newMoney = [moneySingle, ...money]
        setMoney(newMoney)
    }

    const removeMoneySingle = (id: number) => {
        const removeArr = [...money].filter(moneySingle => moneySingle.id !== id)
        setMoney(removeArr)
    }

    const [show, setShow] = useState('add')

    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency')
        if (savedCurrency) {
            return JSON.parse(savedCurrency)
        } else {
            return 'BYN'
        }
    })

    return (
        <CurrencyProvider>
            
            <div className='money-page'>
                <CurrencyButton/>

                <div className='money-comp-wrap money-container'>
                    <div className='graph-div'>
                        KDSAJIDOSAJIODIJOASDIOJ
                    </div>
                    <div className='add-div'>
                        <MoneyUpdate onSubmit={addMoney}/>
                    </div>
                    <div className='display-div'>
                        <div style={{marginBottom:'20px'}}>
                            <span className={show==='add' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px', marginLeft:'10px'}} onClick={() => setShow('add')}>Earnings</span>
                            <span className={show==='subtract' ? 'btn-menu active' : 'btn-menu'} onClick={() => setShow('subtract')}>Expenses</span>
                        </div>
                        <div className='money-scrollable'>
                        <Row>
                        {show === 'add' ? (
                            money
                            .filter((moneySingle: any) => moneySingle.type === 'add') 
                            .map((moneySingle: any, index: any) => (
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
                            ))
                        ) : (
                            money
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
                            ))
                        )}
                        </Row>
                        </div>
                    </div>
                </div>
            </div>
        </CurrencyProvider>
    )
}

export default Money
