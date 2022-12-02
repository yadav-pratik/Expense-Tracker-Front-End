import React, {useState} from "react"
import isEmail from 'validator/lib/isEmail'
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux"

import { startLoginUser } from "../../actions/userActions"
import { toggleIsLogged } from "../../actions/isLoggedActions"


const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validationStyle = {color : 'red'}

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const name = e.target.name
        if(name === 'email'){
            setEmail(e.target.value.trim())
        } else if(name === 'password'){
            setPassword(e.target.value.trim())
        }
    }

    const runValidations = () => {
        //email validations
        if(email.length === 0){
            errors.email = 'Email cannot be empty'
        } else if(!isEmail(email)){
            errors.email = 'Invalid Email Format'
        }

        //password validations
        if(password.trim().length === 0){
            errors.password = 'Password cannot be empty'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const clearAndRedirect = () => {
                setEmail('')
                setPassword('')
                dispatch(toggleIsLogged())
                props.history.push('/')
            }

            const formData = {
                email, password
            }
            
            dispatch(startLoginUser(formData, clearAndRedirect))

        } else {
            setFormErrors(errors)
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow" style={{width : "30vw", minWidth:"300px"}}>
                <div className="card-header">
                    <h5>Login to your Account</h5>
                </div>
                <div style={{paddingLeft : "20px" , paddingRight : "20px"}}>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <label>Enter Your Email</label> 
                        <br/>
                        <input
                            className="form-control" 
                            type="text" 
                            value={email} 
                            onChange={handleChange}
                            name="email"
                        />
                        {formErrors.email ? <p style={validationStyle}>{formErrors.email}</p> : <br/>}
                        <label>Enter Your Password</label> 
                        <br/>
                        <input 
                            className="form-control"
                            type="password" 
                            value={password} 
                            onChange={handleChange}
                            name="password"
                        />
                        {formErrors.password ? <p style={validationStyle}>{formErrors.password}</p> : <br/>}
                        <input className="btn btn-primary" type='submit' value="Login" />
                    </form>
                    <p className="mt-2">New Here? <Link to="/user/register">Register first!</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login