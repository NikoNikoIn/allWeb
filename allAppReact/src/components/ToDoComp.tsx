import '../App.scss'
import '../styles/ToDo.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'

function ToDoComp({task, taskColor, completeTask, removeTask}) {
    const rowStyle = {  
        '--taskBgColor': taskColor
    } 

    return ( 

        <div className={task.isComplete ? 'task-row complete' : 'task-row'} style={rowStyle} draggable={true}>

            <span className='task-content' key={task.id} onClick={() => completeTask(task.id)}>
                {task.text} 
            </span>
            {task.isComplete ? (

                <div>
                    <FontAwesomeIcon icon={faBan} 
                        onClick={() => completeTask(task.id)}
                        className='todo-icon'
                        style={{marginRight:'5px'}}
                    />
                    <FontAwesomeIcon icon={faTrashCan} 
                        onClick={() => removeTask(task.id)}
                        className='todo-icon'
                    />
                </div>
            ) : (
                <div>
                    <FontAwesomeIcon icon={faCheck}  
                        onClick={() => completeTask(task.id)}
                        className='todo-icon'
                    />
                </div>
            )}

        </div>
    )
}


export default ToDoComp
