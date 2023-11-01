import {useState} from 'react'
import '../styles/Money.scss'
import { Container, Row, Col } from 'react-bootstrap'


function MoneyComp() {

    const [earned, setEarned] = useState(() => {
        const earnedAmount = localStorage.getItem('earned')
        if (earnedAmount) {
            return JSON.parse(earnedAmount)
        } else {
            return ['Are you gay?']
        }
    })

    const handleChange = () => {
        setEarned('You are gay')
    }

    return (
        <div className='money-comp-wrap'>
            <div>
                <h1>The Great Cash Tracker</h1>
                <button className='money-add-button' onClick={() => handleChange()}>{earned}</button>

                <h1>The Great Cash Tracker</h1>
                
            </div>
        </div>
    )
}

export default MoneyComp
