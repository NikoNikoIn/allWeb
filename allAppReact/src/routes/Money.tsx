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

    const [changeBackgroundColor, setChangeBackgroundColor] = useState('none')

    const addMoney = (moneySingle: any) => {
        const newMoney = [moneySingle, ...money]
        setMoney(newMoney)

        if (moneySingle.type === 'add') {
            setChangeBackgroundColor('add')
            setTimeout(() => {
                setChangeBackgroundColor('none')
            }, 1200)
        } else if (moneySingle.type === 'subtract') {
            setChangeBackgroundColor('subtract')
            setTimeout(() => {
                setChangeBackgroundColor('none')
            }, 1200)
        }
    }

    const removeMoneySingle = (id: number) => {
        const removeArr = [...money].filter(moneySingle => moneySingle.id !== id)
        setMoney(removeArr)
    }

    const [show, setShow] = useState('add')

    return (
        <CurrencyProvider>
            
            <div className={changeBackgroundColor === 'add' ? 'money-page add' : changeBackgroundColor === 'subtract' ? 'money-page subtract' : 'money-page'}>
                <CurrencyButton/>

                <div className='money-comp-wrap money-container'>
                    <div className='graph-div'>
                        KDSAJIDOSAJIODIJOASDIOJ
                    </div>
                    <div className='add-div'>
                        <MoneyUpdate onSubmit={addMoney}/>
                    </div>
                    <div className='display-div'>
                        <div style={{marginBottom:'20px', marginLeft:'15px'}}>
                            <span className={show==='add' ? 'btn-menu active' : 'btn-menu'} style={{marginRight:'25px'}} onClick={() => setShow('add')}>Earnings</span>
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
