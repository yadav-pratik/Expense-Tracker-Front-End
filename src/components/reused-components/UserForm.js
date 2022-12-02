import React, {useState} from "react"
import isEmail from 'validator/lib/isEmail'

const UserForm = (props) => {
    const { formSubmit, redirect, handleToggle, email : oldEmail , profile } = props

    const [fullName, setFullName] = useState(profile ? profile.name : '')
    const [email, setEmail] = useState(oldEmail ? oldEmail : '')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [occupation, setOccupation] = useState(profile ? profile.occupation : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validationStyle = {color : 'red'}

    const handleChange = (e) => {
        const name = e.target.name
        if(name === 'fullName'){
            setFullName(e.target.value)
        } else if(name === 'email'){
            setEmail(e.target.value.trim())
        }  else if(name === 'password'){
            setPassword(e.target.value.trim())
        }  else if(name === 'occupation'){
            setOccupation(e.target.value)
        } else if(name === 'profilePic'){
            setProfilePic(e.target.files[0])
        }
    }

    const runValidations = () => {
        //fullName validations
        if(fullName.length === 0){
            errors.fullName = 'Name cannot be empty'
        } else if(!fullName.trim().includes(' ')){
            errors.fullName = 'You should enter your Full Name'
        }

        //email validations
        if(email.length === 0){
            errors.email = 'Email cannot be empty'
        } else if(!isEmail(email)){
            errors.email = 'Invalid Email Format'
        }

        //password validations
        if(!handleToggle){
            if(password.length === 0){
                errors.password = 'Password cannot be empty'
            } else if(password.length < 8 || password.length >128){
                errors.password = 'Password should be between 8 and 128 characters'
            }
        }

        if(handleToggle){
            //occupation validations
            if(occupation.length === 0){
                errors.occupation = 'Occupation cannot be empty'
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        runValidations()
        
        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const clear = () => {
                setFullName('')
                setEmail('')
                setPassword('')
                setOccupation('')
                if(redirect){
                    redirect()
                }

                if(handleToggle){
                    handleToggle()
                }
            }

            const formData = handleToggle ? (
                    profilePic ? (
                        {
                            email, profile : { name : fullName.trim(), occupation : occupation.trim()} , profilePic : profilePic
                        }
                    ) : (
                        {
                        email, profile : { name : fullName.trim(), occupation : occupation.trim()}
                        }
                    )
                    
                ) : (
                    {
                    email, password , profile : { name : fullName.trim()}
                    } 
                )

            formSubmit(formData, clear)
            
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>{handleToggle ? "Edit Name" : "Enter Your Full Name"}</label> 
                    <br/>
                    <input 
                        className="form-control"
                        type="text" 
                        value={fullName} 
                        onChange={handleChange}
                        name="fullName"
                    />
                    {formErrors.fullName ? <p style={validationStyle}>{formErrors.fullName}</p> : <br/>}
                    <label>{handleToggle ? "Edit Email" : "Enter an Email"}</label> 
                    <br/>
                    <input 
                        className="form-control"
                        type="text" 
                        value={email} 
                        onChange={handleChange}
                        name="email"
                    />
                    {formErrors.email ? <p style={validationStyle}>{formErrors.email}</p> : <br/>}
                    {!handleToggle && <div>
                        <label>Enter a Password</label> 
                        <br/>
                        <input 
                            className="form-control"
                            type="password" 
                            value={password} 
                            onChange={handleChange}
                            name="password"
                        />
                    {formErrors.password ? <p style={validationStyle}>{formErrors.password}</p> : <br/>}
                    </div>}
                    {handleToggle && (
                        <div>
                            <label>Enter Your Occupation</label>
                            <br/>
                            <input 
                                className="form-control"
                                type="text" 
                                value={occupation} 
                                onChange={handleChange}
                                name="occupation"
                            />
                            {formErrors.occupation ? <p style={validationStyle}>{formErrors.occupation}</p> : <br/>}
                            <label>Edit your Profile Pic</label>
                            <input 
                                className="form-control"
                                type="file" 
                                accept=".jpg, .jpeg, .png"
                                onChange={handleChange}
                                name="profilePic"
                            />
                            <br/>
                        </div>
                    )}
                    <input className="btn btn-primary" type='submit' value="Submit" />
                    {handleToggle && <button 
                                        className="btn btn-outline-secondary"
                                        onClick={()=>{handleToggle()}}
                                    >Cancel</button>}
                </form>
            </div>
        </div>
    )
}

export default UserForm