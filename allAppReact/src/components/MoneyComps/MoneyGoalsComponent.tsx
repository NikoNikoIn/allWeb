import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


type GoalType = {
    id: number, text: string, amount: number, completion: number
}

const MoneyGoalsComponent = ({ goal, removeGoal }: { goal: GoalType, removeMoneySingle: (id: number) => void }) => {
    return (
        <div className='general-money-wrapper goal' style={{margin: '15px 0px 0px 0px', padding: '10px'}}>
            <h4>{goal.text}</h4>
            <div className='progress-bar-container' style={{display: 'flex', alignContent: 'center'}}>

            </div>
            <h5>{goal.amount}</h5>
            <FontAwesomeIcon icon={faXmark} style={{color: '#c40606', cursor: 'pointer'}} onClick={() => removeGoal(goal.id)}/>

        </div>
    )
}

export default MoneyGoalsComponent
