import React from 'react'
import { Link } from 'react-router-dom'
import '../App.scss'


function Error() {
    return (
        <div className='main'>
            <h2>Error :(, 404</h2>
            <p>go to 
                <Link to='/'>home</Link> page
            </p>
        </div>
    )
}

export default Error
