import React, {useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'


type GoalType = {
    id: number, text: string, amount: number, completion: number
}

interface GoalUpdateProps {
    onSubmit: (data: { id: number; amount: number; type: string; date: string, purpose: string }) => void,
}

const MoneyGoalsComponent = ({ goal, removeGoal, availableMoney, setEarnMoney, onSubmit }: { goal: GoalType, removeGoal: (id: number) => void, availableMoney: any, setEarnMoney: any, onSubmit: (data: { id: number; amount: number; type: string; date: string, purpose: string }) => void }) => {

    const [show, setShow] = useState(false)
    const buttonRef = useRef(null)

    return (
        <div className='general-money-wrapper goal' style={{margin: '15px 0px 0px 0px', padding: '10px', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                <h4>{goal.text}</h4>
                <FontAwesomeIcon icon={faXmark} style={{color: '#c40606', cursor: 'pointer'}} onClick={() => removeGoal(goal.id)}/>
            </div>

            <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <div className='progress-bar-container'>
                    <div className='progress-bar-money' style={{ display: 'flex', justifyContent: 'center', alignItems:'center', width: `${(goal.completion/goal.amount) * 100}%`, backgroundColor: (goal.completion/goal.amount) * 100 < 20 ? '#d6245f' : (goal.completion/goal.amount) * 100 < 40 ? '#d62d24' : (goal.completion/goal.amount) * 100 < 60 ? '#d67124' : (goal.completion/goal.amount) * 100 < 80 ? '#d6c424' : (goal.completion/goal.amount) * 100 < 99 ? '#71d624' : '#24d6bb'}}/>
                </div>
                {goal.completion < goal.amount && (
                <button onClick={() => setShow(!show)} ref={buttonRef} className={!show ? 'money-button goal' : 'money-button goal-alt'} style={{width:'40px', height:'40px'}}>
                    <FontAwesomeIcon icon={!show ? faPlus : faXmark}/>
                </button>
                )}
            </div>

            <h5>{goal.amount} - {goal.completion}</h5>


        </div>
    )
}

export default MoneyGoalsComponent
