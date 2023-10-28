import '../App.scss'    
import '../styles/SideBar.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ThemeButton from './ThemeButton'
import Items from './Items'

const {items} = Items

const SideItems = items.map(item => (
    <Link key={item.to} to={item.to} className='sidenav-item'>
        <FontAwesomeIcon icon={item.icon} className='sidenav-item-icon' /> 
        <span className='sidenav-item-text'>{item.text}</span>
    </Link>
))


const SideBar = () => {
    return (
        <div className='sidenav'>        
            {SideItems}
            <ThemeButton />
        </div>
            
    )
}

export default SideBar