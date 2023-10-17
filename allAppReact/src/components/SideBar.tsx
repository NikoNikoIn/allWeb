import React, {useState} from 'react'
import '../App.scss'    
import '../styles/SideBar.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faListUl, faHouse, faSun, faMoon, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ReactSwitch from 'react-switch'
import ThemeHook from '../hooks/ThemeHook'


const StyledIconSun = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: '#ffffff'
    
    }}>
        <FontAwesomeIcon icon={faSun as IconProp}/>
    </div>
)


const StyledIconMoon = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: '#ffd321'
    
    }}>
        <FontAwesomeIcon icon={faMoon as IconProp}/>
    </div>
)


const SideBar = () => {
    const { theme, setTheme } = ThemeHook()
    const handleThemeClick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme')
        if (currentTheme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    const [collapsed, setCollapsed] = useState(true)
    const handleCollapseClick = () => {
        if (collapsed) {
            setCollapsed(false)
        } else {
            setCollapsed(true)
        }
    }
    return (
        <>
            {collapsed ?
                <>
                    <div className='sidenav'>
                        <Link to='/' className='sidenav-item'>
                            <FontAwesomeIcon icon={faHouse as IconProp} className='sidenav-item-icon'/> 
                            <span className='sidenav-item-text'>Homesssssssssssssss</span>
                        </Link>
                        <Link to='/todo' className='sidenav-item'>
                            <FontAwesomeIcon icon={faListUl as IconProp} className='sidenav-item-icon'/> 
                            <span className='sidenav-item-text'>ToDo</span>
                        </Link>
                        <ReactSwitch className='theme-button' onChange={handleThemeClick} checked={theme==='light'} 
                            offColor='#192237' 
                            onColor='#ffd321' 
                            checkedIcon={<StyledIconSun/>}
                            uncheckedIcon={<StyledIconMoon/>}
                        />
                    </div>
                    <div >
                        <button onClick={handleCollapseClick} type='button' className='collapse-button'><FontAwesomeIcon className='collapse-button-arrow' icon={faArrowRight as IconProp} /></button>
                    </div>
                </>
            :
                <>
                    <div className='sidenav-uncollapsed'>
                        <Link to='/' className='sidenav-item'>
                            <FontAwesomeIcon icon={faHouse as IconProp} className='sidenav-item-icon'/> 
                            <span className='sidenav-item-text'>Homesssssssssssssss</span>
                        </Link>
                        <Link to='/todo' className='sidenav-item'>
                            <FontAwesomeIcon icon={faListUl as IconProp} className='sidenav-item-icon'/> 
                            <span className='sidenav-item-text'>ToDo</span>
                        </Link>
                        <ReactSwitch className='theme-button' onChange={handleThemeClick} checked={theme==='light'} 
                            offColor='#192237' 
                            onColor='#ffd321' 
                            checkedIcon={<StyledIconSun/>}
                            uncheckedIcon={<StyledIconMoon/>}
                        />
                    </div>
                    <div >
                        <button onClick={handleCollapseClick} type='button' className='collapse-button-uncollapsed'><FontAwesomeIcon rotation={180} className='collapse-button-arrow' icon={faArrowRight as IconProp} /></button>
                    </div>
                </>
            }
            
            
        </>
    )
}

export default SideBar