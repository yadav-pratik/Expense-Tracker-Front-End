import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <h1 className='display-1 mt-5 mb-5'>Error 404.</h1>
            <h2 className='mb-5'>The Page You are looking for either Doesn't Exist or was removed by the Owner!!!</h2>
            <h4><Link to="/">Back to Home</Link></h4>
        </div>
    )
}

export default NotFound