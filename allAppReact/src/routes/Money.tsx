import { Container, Row, Col } from 'react-bootstrap'
import '../App.scss'
import '../styles/Money.scss'

/*TODO:

1. Set up one of the states (expenses or earnings) in respective components
2. Store the money in localstorage
3. Make a graph below that showcases the changes
4. Style everything

*/

import MoneyComp from '../components/MoneyComp'


function Money() {
    return (
        <div className='money-page'>
            <div className='main'>
                <Container>

                    <Row >
                        <MoneyComp />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Money
