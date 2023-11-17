import React, {useState, useEffect} from 'react'


import MoneyGoalCreate from './MoneyGoalCreate'
import MoneyGoalsComponent from './MoneyGoalsComponent'


const MoneyGoals = ({money}: {money: any}) => {

    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem('goals')
        if (savedGoals) {
            return JSON.parse(savedGoals)
        } else {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals))
    }, [goals])

    const addGoal = (goal: any) => {
        const newGoals = [goal, ...goals]
        setGoals(newGoals)
    }

    const removeGoal = (id: number) => {
        const removeArr = [...goals].filter((item: any) => item.id !== id)
        setGoals(removeArr)
    }

    return (
        <div className='add-wrapper'>
            <div className='add-content'>
                <h2>Your Goals</h2>
                <MoneyGoalCreate onSubmit={addGoal}/>

                {goals.map((goal: any) => (
                    <MoneyGoalsComponent goal={goal} removeGoal={removeGoal}/>
                ))}
                <br/>
            </div>
        </div>
    )
}

export default MoneyGoals
