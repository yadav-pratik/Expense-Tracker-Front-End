import React from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({component : Component, ...restProps}) => {
    return (
        <Route 
            {...restProps}
            render = {(props) => {
                return localStorage.getItem('token') ? (
                    <Component {...props} {...restProps} />
                ) : (
                    <Redirect 
                        to={{
                            pathname : '/user/login'
                        }}
                    />
                )
            }}
        />
    )
}

export default PrivateRoute