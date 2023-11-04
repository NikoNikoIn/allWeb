import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../App.scss'
import '../styles/Money.scss'

/*TODO:

1. Set up one of the states (expenses or earnings) in respective components
2. Store the money in localstorage
3. Make a graph below that showcases the changes
4. Style everything

*/

import MoneyUpdate from '../components/MoneyUpdate'
import MoneyComponent from '../components/MoneyComponent'




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

    return (
        <div className='money-page'>
            <div>
                <Container className='money-comp-wrap parent'>
                    <Row className='add-div'>
                        <MoneyUpdate onSubmit={addMoney}/>

                    </Row>
                    <Row className='display-div'>
                        <div>
                            <button className='btn-menu' onClick={() => setShow('add')}>Earnings</button>
                            <button className='btn-menu' onClick={() => setShow('subtract')}>Expenses</button>
                            {show === 'add' ? (
                                money
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
                                ))
                            )
                            
                            : (
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
                            
                            
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Money
