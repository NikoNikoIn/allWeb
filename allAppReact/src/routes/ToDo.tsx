
import React, {useState} from 'react'
import '../App.scss'
import '../styles/ToDo.scss'
import { Row, Col, Container } from 'react-bootstrap'

import ToDoForm from '../components/ToDoForm'



function ToDo() {

    const [tasks, setTasks] = useState([])

    const addTask = task => {
        if(!task.text || /^\s*$/.test(task.text)) {
            return
        }

        const newTasks = [task, ...tasks]
        setTasks(newTasks)
        console.log(...tasks)

    }

    return (
        <div className='main'>
            <Container>
                <Row>
                    <Col className='col-wrap d-flex flex-column justify-content-center align-items-center' style={{marginTop:'25px'}}>
                        <h1>The Ultimate To-Do List</h1>
                        <ToDoForm onSubmit={addTask}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ToDo
