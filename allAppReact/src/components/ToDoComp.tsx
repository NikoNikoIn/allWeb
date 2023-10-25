import React, {useState} from 'react'
import ToDoForm from './ToDoForm'
import '../App.scss'
import '../styles/ToDo.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


function ToDoComp({tasks, completeTask, removeTask}) {
    const colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722'
    ] // Add your desired colors
  
    return tasks.map((task, index) => {
        const color = colors[index % colors.length]
        const rowStyle = { 
            '--taskBgColor': color
        }
        
        return (
            <div key={index} className={task.isComplete ? 'task-row complete' : 'task-row'} style={rowStyle}>
                <div key={task.id} onClick={() => completeTask(task.id)}>
                    {task.text}
                </div>
                <div className='task-icon'>
                    <FontAwesomeIcon icon={faCircleXmark} 
                        onClick={() => removeTask(task.id)}
                        className='delete-icon'
                    />
                </div>
            </div>
        )
    })
}

export default ToDoComp
