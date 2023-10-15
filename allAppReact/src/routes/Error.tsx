import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div>
            <h2>Error :(, 404</h2>
            <p>go to 
                <Link to='/'>home</Link> page
            </p>
        </div>
    )
}

export default Error
