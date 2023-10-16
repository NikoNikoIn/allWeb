import React from 'react'
import '../App.scss'
import ThemeHook from '../hooks/ThemeHook'

function Home() {
    const {theme, setTheme } = ThemeHook()
    return (
        <div className='main'>
            <h1>
                Homeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </h1>
        </div>
    )
}

export default Home
