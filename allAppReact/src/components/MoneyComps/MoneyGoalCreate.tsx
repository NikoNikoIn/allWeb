import React, {useState, FormEvent, ChangeEvent, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import { CurrencyContext } from '../../contexts/CurrencyContext'



interface GoalFormProps {
    onSubmit: (data: {id: number, text: string, amount: number, completion: number}) => void
}


const MoneyGoalCreate: React.FC<GoalFormProps> = (props) => {

    const [goal, setGoal] = useState<string>('')
    const [amount, setAmount] = useState<string>('')

    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const number = parseInt(amount)
        if (isNaN(number)) {
            return
        }

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: goal,
            amount: parseInt(amount),
            completion: 0,
        })
        setGoal('')
        setAmount('')
        setShow(false)
    }

    const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGoal(e.target.value)
    }

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    }


    const currencyContext = useContext(CurrencyContext)

    if (!currencyContext) {
        throw new Error('CurrencyContext not found. Make sure you have wrapped your component with CurrencyProvider')
    }
    const { currency } = currencyContext

    const [show, setShow] = useState(false)

    return (
        <div>

        

        {show ? (
            <div className='general-money-wrapper goal' style={{marginTop: '15px'}}>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingTop:'5px', paddingLeft:'10px', paddingRight:'10px'}}>
                    <h3>Add new <span style={{color:'$moneyGoals'}}>Goal</span></h3>
                    <FontAwesomeIcon icon={faXmark} style={{color: '#c40606', cursor: 'pointer'}} onClick={() => setShow(!show)}/>
                </div>
                <Form onSubmit={handleAdd} style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                    <input className='money-input goals' type='text' placeholder='What is your goal?' value={goal} onChange={handleGoalChange} style={{width:'40%'}}/>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <input
                            type='text'
                            className='money-input goals'
                            min='0'
                            placeholder='How much?'
                            style={{width:'50%'}}
                            onKeyDown={(e) => {
                                const keyCode = e.key;
                                const isValidKey = /^[0-9]$/.test(keyCode) || keyCode === 'Backspace'
                                if (!isValidKey) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={handleAmountChange}
                            value={amount}
                        />    
                        <span style={{fontSize:'20px'}}>{currency}</span>
                    </div>     
                    <div>
                        <button className={goal && amount ? 'money-button goal' : 'money-button goal disabled'}><FontAwesomeIcon size='lg' icon={faPlus}/></button>
                    </div>
                </Form>
            </div>
        ) : (
            <button onClick={() => setShow(!show)} className='money-goal-button'>
                <FontAwesomeIcon icon={faPlus}/> Add goal
            </button>
        )}
        </div>

    )
}

export default MoneyGoalCreate
