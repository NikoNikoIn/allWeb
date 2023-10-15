import React, {useState} from 'react'
import '../styles/SideBar.scss'    
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className='sidenav'>
            <h1>AAA</h1>
            <div>
                <Link to="/" className='sidenav-item'>Home</Link>
                <Link to="/todo" className='sidenav-item'>ToDo</Link>
            </div>
        </div>
    )
}

export default SideBar