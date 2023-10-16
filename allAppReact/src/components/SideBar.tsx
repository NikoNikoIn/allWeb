import React from 'react'
import '../App.scss'    
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faListUl, faHouse } from '@fortawesome/free-solid-svg-icons'


const SideBar = () => {
    return (
        <div className='sidenav'>
            <Link to='/' className='sidenav-item'><FontAwesomeIcon icon={faHouse as IconProp} size='sm'/> Home</Link>
            <Link to='/todo' className='sidenav-item'><FontAwesomeIcon icon={faListUl as IconProp} size='sm'/> ToDo</Link>
        </div>
    )
}

export default SideBar