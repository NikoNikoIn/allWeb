import {useState, useEffect, useRef} from 'react'
import '../App.scss'
import '../styles/ToDo.scss'
import { Row, Col, Container, Form } from 'react-bootstrap'

import ToDoForm from '../components/ToDoComps/ToDoForm'
import ToDoComp from '../components/ToDoComps/ToDoComp'

import Items from '../components/Items'
const { taskColors } = Items


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
  
    const addTask = (task:any) => {
        if(!task.text || /^\s*$/.test(task.text)) {
            return
        }
        const newTasks = [...tasks, task]
        setTasks(newTasks)
    }

    const completeTask = (id: number) => {
        let updatedTasks = tasks.map((task:any) => {
            if (task.id === id) {
                task.isComplete = !task.isComplete
            }
            return task
        })
        setTasks(updatedTasks)
    }

    const removeTask = (id: number) => {
        const removeArr = [...tasks].filter(task => task.id !== id)
        setTasks(removeArr)
    }

    const dragTask = useRef<any>(null)
    const dragOverTask = useRef<any>(null)

    const handleSort = () => {
        let _tasks = [...tasks]

        const draggedTaskContent = _tasks.splice(dragTask.current, 1)[0]

        _tasks.splice(dragOverTask.current, 0, draggedTaskContent)

        dragTask.current = null
        dragOverTask.current = null

        setTasks(_tasks)
    }

    const [colValue, setColValue] = useState(1)
    const colMap = new Map<number, number>([
        [1, 12],
        [2, 6],
        [3, 4],
        [4, 3],
    ])
      

    return (
        <div className='todo-page'>
            <div className='main'>
                <Container>
                    <Row>
                        <Col className='col-wrap-todo d-flex flex-column justify-content-center align-items-center' style={{marginTop:'25px'}}>
                            <h1>The Ultimate To-Do List</h1>
                            <ToDoForm onSubmit={addTask}/>
                            <div className='task-per-row'>
                                <h4>Tasks per row: {colValue}</h4>
                                <Form.Range min={1} max={4} step={1} value={colValue} onChange={changeEvent => setColValue(Number(changeEvent.target.value))}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    {
                        tasks.map((task: any, index: number) => (
                                <Col 
                                    md={colMap.get(colValue)} 
                                    xs={12}
                                    key={`task-${task.id}`}
                                    onDragStart={() => dragTask.current = index}
                                    onDragEnter={() => dragOverTask.current = index}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <ToDoComp
                                        task={task}
                                        taskColor={taskColors[index%15]}
                                        completeTask={completeTask}
                                        removeTask={removeTask}
                                    />
                                </Col>
                    ))}

                    </Row>
                
                </Container>
            </div>
        </div>
    )
}

export default ToDo
