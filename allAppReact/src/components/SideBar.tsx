import React, {useState} from 'react'
import '../App.scss'    
import '../styles/SideBar.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faListUl, faHouse, faCloud, faClock } from '@fortawesome/free-solid-svg-icons'

import ThemeButton from './ThemeButton'



const items = [
    {to: '/', text: 'Home', icon: faHouse},
    {to: '/todo', text: 'ToDo', icon: faListUl},
    {to: '/weather', text: 'Weather', icon: faCloud},
    {to: '/clock', text: 'Clock', icon: faClock},
]

const SideItems = items.map(item => (
    <Link key={item.to} to={item.to} className='sidenav-item'>
        <FontAwesomeIcon icon={item.icon as IconProp} className='sidenav-item-icon' /> 
        <span className='sidenav-item-text'>{item.text}</span>
    </Link>
))


const SideBar = () => {
    return (

        <>
            <div className='sidenav'>
                {SideItems}
                <ThemeButton />
            </div>
        </>
            
    )
}

export default SideBar