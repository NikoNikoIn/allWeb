import React, { useState, useLayoutEffect } from 'react'


const ThemeHook = () => {

    const [theme, setTheme] = useState('dark')

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return {theme, setTheme}
}

export default ThemeHook
