import React, { FormEvent, useState} from 'react'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


interface ToDoFormProps {
    onSubmit: (data: {id: number, text: string}) => void
}

const ToDoForm: React.FC<ToDoFormProps> = (props) => {

    const[input, setInput] = useState('')

    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })
        setInput('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <Form className='form-todo' onSubmit={handleAdd}>
            <input type='text' placeholder='What To-Do?' value={input} 
            className='input-todo' onChange={handleChange}/>
            <button className='add-task-button'><FontAwesomeIcon size='lg' icon={faPlus}/></button>
        </Form>
    )
}

export default ToDoForm;
