import React, { useState, FormEvent, ChangeEvent } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'

interface MoneyUpdateProps {
    onSubmit: (data: { id: number; amount: number; type: string }) => void
}

const MoneyUpdate: React.FC<MoneyUpdateProps> = (props) => {
    const [earned, setEarned] = useState<number[]>(() => {
        const earnedAmount = localStorage.getItem('earned')
        if (earnedAmount) {
            return JSON.parse(earnedAmount)
        } else {
            return []
        }
    })

    const [spent, setSpent] = useState<number[]>(() => {
        const spentAmount = localStorage.getItem('spent')
        if (spentAmount) {
            return JSON.parse(spentAmount)
        } else {
            return []
        }
    })

    const [input, setInput] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault()

        const amount = parseInt(input)
        console.log(amount)
        if (isNaN(amount)) {
            return
        }

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            amount: amount,
            type: type,
        })
        setInput('')
    }

    return (
        <div className='add-div'>
            <div className='add-div' style={{ display: 'flex' }}>
                <button
                    type='submit'
                    className='money-button add'
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e, 'add')}
                >
                    <FontAwesomeIcon size='xl' icon={faAnglesUp} />
                </button>
                <button
                    type='submit'
                    className='money-button subtract'
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e, 'subtract')}
                >
                    <FontAwesomeIcon size='xl' rotation={180} icon={faAnglesUp} />
                </button>
            </div>

            <input
                type='text'
                className='money-input'
                min='0'
                onInput={(e) => {
                    let value = e.currentTarget.value.replace(/[^0-9]/g, '')
                    setInput(value)
                }}
                onChange={handleChange}
                value={input}
            />
        </div>
    )
}

export default MoneyUpdate