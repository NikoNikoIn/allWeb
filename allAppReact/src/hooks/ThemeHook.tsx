import React, { useState, useLayoutEffect } from 'react'

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)')
const defaultTheme = isDarkTheme ? 'dark' : 'light'


const ThemeHook = () => {

    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme)

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return {theme, setTheme}
}

export default ThemeHook
