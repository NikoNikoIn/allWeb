import ReactSwitch from 'react-switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import ThemeHook from '../hooks/ThemeHook'
import '../App.scss'    
import '../styles/SideBar.scss'


const StyledIconSun = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: '#ffffff'
    
    }}>
        <FontAwesomeIcon icon={faSun}/>
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
        <FontAwesomeIcon icon={faMoon}/>
    </div>
)


const ThemeButton = () => {

    const { theme, setTheme } = ThemeHook()
    const handleThemeClick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme')
        if (currentTheme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div>
            <ReactSwitch className='theme-button' onChange={handleThemeClick} checked={theme==='light'} 
                offColor='#192237' 
                onColor='#ffd321' 
                checkedIcon={<StyledIconSun/>}
                uncheckedIcon={<StyledIconMoon/>}
            />
        </div>
    )
}

export default ThemeButton
