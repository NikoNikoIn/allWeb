import React, {useState} from 'react'
import ToDoForm from './ToDoForm'
import '../App.scss'
import '../styles/ToDo.scss'


function ToDoComp() {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    return tasks.map((task, index) => (
        <div key={index} className={task.isComplete ? 'task-row complete' : 'task-row'}>
            <div key={task.id} onClick={() => completeTask(task.id)}>{task.text}</div>

        </div>
    ))
}

export default ToDoComp
