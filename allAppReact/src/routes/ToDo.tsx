
import React, {useState, useEffect} from 'react'
import '../App.scss'
import '../styles/ToDo.scss'
import { Row, Col, Container } from 'react-bootstrap'

import ToDoForm from '../components/ToDoForm'
import ToDoComp from '../components/ToDoComp'



function ToDo() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            return JSON.parse(savedTasks)
        } else {
            return []
        }
    })


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = task => {
        if(!task.text || /^\s*$/.test(task.text)) {
            return
        }

        const newTasks = [task, ...tasks]
        setTasks(newTasks)

    }

    const completeTask = id => {
        let updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.isComplete = !task.isComplete
            }
            return task
        })
        setTasks(updatedTasks)
    }

    const removeTask = id => {
        const removeArr = [...tasks].filter(task => task.id !== id)

        setTasks(removeArr)
    }

    

    return (
        <div className='todo-page'>
            <div className='main'>
                <Container>
                    <Row>
                        <Col className='col-wrap-todo d-flex flex-column justify-content-center align-items-center' style={{marginTop:'25px'}}>
                            <h1>The Ultimate To-Do List</h1>
                            <ToDoForm onSubmit={addTask}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ToDoComp
                                tasks={tasks}
                                completeTask={completeTask}
                                removeTask={removeTask}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ToDo
