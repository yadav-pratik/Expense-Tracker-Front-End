import React from "react"
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux"

import { startRegisterUser } from "../../actions/userActions"

import UserForm from "../reused-components/UserForm"


const Register = (props) => {

    const dispatch = useDispatch()

    const redirect = () => {
        props.history.push('/user/login')
    }

    const formSubmit = (formData, clearAndRedirect) => {
        dispatch(startRegisterUser(formData, clearAndRedirect))
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow"  style={{width : "30vw", minWidth:"300px"}}>
                <div className="card-header">
                    <h5>Register with Us!</h5>
                </div>
                <div style={{paddingLeft : "20px", paddingRight : "20px", marginTop : "30px"}}>
                    <UserForm 
                        formSubmit={formSubmit}
                        redirect = {redirect}    
                    />
                    <p className="mt-2">Already a user? <Link to="/user/login">Login!</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register