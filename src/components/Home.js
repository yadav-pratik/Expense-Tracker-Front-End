import React from "react"
import {Link} from 'react-router-dom'


const Home = (props) => {
    const handleClick = (e) => {
        props.history.push('/user/register')
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                <h2 
                    className="mb-5" 
                    style={{textAlign : 'center'}}
                >Managing Money, Made Simple!</h2>
                <h4>Expenses App is 'the' one stop solution for tracking your all your expenses.</h4>
                <h4 className="mb-5" >And its Absolutely free!!</h4>
                <h4 className="mb-5" >Get Started Today!</h4>
                <button 
                    className="btn btn-outline-success mb-5" 
                    onClick={handleClick}
                >Sign Up for free</button>
                <p style={{textAlign : 'center'}}>Already a user? <Link to="/user/login">Sign In</Link></p>
            </div>
        </div>
    )
}

export default Home