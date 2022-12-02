import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startGetUser, startUpdateUser } from '../../actions/userActions'
import { toggleIsLogged } from '../../actions/isLoggedActions'
import { logoutUser } from '../../actions/userActions'

import { handleLogout } from '../../Helper Functions/sweetAlerts'

import UserForm from '../reused-components/UserForm'

const Profile = (props) => {
    const [toggle, setToggle] = useState(false)
    
    const dispatch = useDispatch()

    const user = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        dispatch(startGetUser())
    },[dispatch])

    const handleClick = () => {

        const logoutAndRedirect = () => {
            localStorage.removeItem('token')
            dispatch(toggleIsLogged())
            dispatch(logoutUser())
            props.history.push('/')
        }

        handleLogout(logoutAndRedirect)
    } 

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const formSubmit = (formData, clearAndToggle) => {
        dispatch(startUpdateUser(formData, clearAndToggle))
    }

    return (
        <div>
            <div className='row'>
                <h2 className='col-10'>Profile Page</h2>
                <button 
                    className='col btn btn-secondary shadow' 
                    style={{marginRight : '10px'}}
                    onClick={handleClick}
                >Logout</button>
            </div>
            { toggle ? (
                <div style={{width : '40vw' , minWidth : '300px'}}>
                    <h4>Edit Profile</h4>
                    <UserForm 
                        handleToggle = {handleToggle}
                        formSubmit = {formSubmit}
                        {...user}
                    />
                </div>
            ) : (
                <div className='row mt-5'>
                    <div className='col-9'>
                        <h4 className='mb-5'>Personal Details</h4>
                        <h4>Name - {user.profile && user.profile.name}</h4>
                        <h4>Email - {user.email}</h4>
                        <h4>Occupation - {user.profile && user.profile.occupation}</h4>
                        <button
                            className='mt-5 btn btn-outline-primary'
                            onClick={handleToggle}
                        >Edit Details</button>
                    </div>
                    <img 
                        className='col-2'
                        src={user.profilePic ? process.env.REACT_APP_IMAGE_PATH + user.profilePic : require('../../images/PngItem_5040528.png')} 
                        height={user.profilePic ? '300px' : '230px'}
                        alt="profile_image"
                    />
                </div>
            )}

        </div>
    )
}

export default Profile