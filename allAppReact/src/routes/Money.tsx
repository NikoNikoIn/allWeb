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
import MoneyDisplay from '../components/MoneyDisplay'




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

    const addMoney = (money:any) => {
        console.log(money.type)
    }

    return (
        <div className='money-page'>
            <div>
                <Container>
                    <Row className='money-comp-wrap parent'>
                        <MoneyUpdate onSubmit={addMoney}/>
                        <MoneyDisplay />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Money
