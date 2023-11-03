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

    return (
        <div className='money-page'>
            <div>
                <Container className='money-comp-wrap parent'>
                    <Row className='add-div'>
                        <MoneyUpdate onSubmit={addMoney}/>

                    </Row>
                    <Row className='display-div'>
                        
                            
                        Mdompsapdaopsd
                        
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Money
