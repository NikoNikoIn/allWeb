import React, { useState, FormEvent, ChangeEvent, useContext } from 'react'
import { Container, Row, Col, Form, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { CurrencyContext } from '../contexts/CurrencyContext'


interface MoneyUpdateProps {
    onSubmit: (data: { id: number; amount: number; type: string; date: string }) => void
}


const MoneyUpdate: React.FC<MoneyUpdateProps> = (props) => {

    const [input, setInput] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault()
      
        const amount = parseInt(input)
        if (isNaN(amount)) {
            return
        }

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const currentDate = new Date()
        
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: userTimeZone,
        }
        
        const timeString = currentDate.toLocaleString('en-GB', options)
        
        const day = currentDate.getDate().toString().padStart(2, '0')
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const year = currentDate.getFullYear()
        
        const formattedDate = `${timeString} ${day}.${month}.${year}`
        
      
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            amount: amount,
            type: type,
            date: formattedDate,

        })
        setInput('')


    }

    const { currency } = useContext(CurrencyContext)

    return (
        <div className='add-div money-wrapper'>
            <div>
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
            <div className='money-input-wrap' style={{marginBottom:'10px'}}>
                <input
                    type='text'
                    className='money-input'
                    min='0'
                    onKeyDown={(e) => {
                        const keyCode = e.key;
                        const isValidKey = /^[0-9]$/.test(keyCode) || keyCode === "Backspace"; // Numbers 0-9 or Backspace
                        if (!isValidKey) {
                            e.preventDefault();
                        }
                    }}
                    onChange={handleChange}
                    value={input}
                    maxLength={5}
                />
                <span style={{fontSize:'25px'}}>{currency}</span>
            </div>
        </div>
    )
}

export default MoneyUpdate