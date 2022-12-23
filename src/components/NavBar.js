import React from "react"
import {Link, Route, Switch} from 'react-router-dom'
import { useSelector } from "react-redux"

import Home from './Home' 
import Dashboard from './user/Dashboard'
import Register from "./authentication/Register"
import Login from "./authentication/Login"
import Settings from "./user/Settings"
import Profile from "./user/Profile"
import PrivateRoute from "./authentication/PrivateRoute"

const NavBar = (props) => {
    const navStyle = {
        color : 'white',
        width : '8vw', 
        minWidth : '60px',
        height : '5vh',
        minHeight : '30px',
        maxHeight : '35px',
        minWidth : '100px',
        textAlign : 'center',
        marginRight : '7px',
        textDecoration : 'none',
        paddingTop : '2px'
    }

    const brandStyle = {
        textDecoration : 'none',
        color : 'white',
        marginLeft : '30px'
    }

    const isLogged = useSelector((state)=>{
        return state.isLogged
    })
    return (
        <div>
            <div className="sticky-top">
                <div className='navbar bg-dark'>
                    <div className='navbar-brand'>
                        <h1><Link to="/" style={brandStyle}>Expense Tracker</Link></h1>
                    </div>
                </div > 
                {isLogged ? (
                    <div style={{backgroundColor : 'green'}} className="d-flex justify-content-end mb-5 shadow">
                        <Link to='/' style={navStyle}>Dashboard</Link>
                        <Link to='/user/settings' style={navStyle}>Settings</Link>
                        <Link to='/user/profile'  style={navStyle}>Profile</Link>
                    </div>
                ) : (
                    <div style={{backgroundColor : 'green'}} className="d-flex justify-content-end mb-5 shadow">  
                        <Link to='/' style={navStyle}>Home</Link>
                        <Link to='/user/register' style={navStyle}>Sign Up</Link>
                        <Link to='/user/login'  style={navStyle}>Login</Link>
                    </div>
                )}
            </div>  
            <Switch>
                <Route path='/' component={isLogged ? Dashboard : Home} exact/>
                <Route path='/user/register' component={Register} exact/>
                <Route path='/user/login' component={Login} exact/>
                <PrivateRoute path='/user/settings' component={Settings} exact/>
                <PrivateRoute path='/user/profile' component={Profile} exact/>
                <Route path='*' component={NotFound} />
            </Switch>

        </div>
    )
}

export default NavBar
