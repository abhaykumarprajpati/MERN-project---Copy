import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <h1>
                Not found
            </h1>
            <Link to="/">Home</Link>
        </div>
    )
}

export default NotFound
