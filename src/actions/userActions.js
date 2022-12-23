import axios from 'axios'
import { normalAlert } from '../Helper Functions/sweetAlerts'

export const startRegisterUser = (formData, clearAndRedirect) => {
    return (
        async () => {
            try {
                const { data } = await axios.post('/api/users',formData)
                if(data.hasOwnProperty('errors')){
                    normalAlert(data.message, 'info')
                } else {
                    normalAlert(data.success, 'success')
                    clearAndRedirect()
                }
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

export const startLoginUser =  (formData, clearAndRedirect) => {
    return (
        async () => {
            try {
                const { data } = await axios.post('/api/users/login',formData)
                if(data.hasOwnProperty('notice')){
                    normalAlert(data.notice, 'error')
                } else if(data.hasOwnProperty('errors') || data.hasOwnProperty('message')){
                    normalAlert(data.message, 'error')
                } else if(data.hasOwnProperty('token')){
                    normalAlert('Login Successful', 'success')
                    localStorage.setItem('token',data.token)
                    clearAndRedirect()
                }
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

export const startGetUser = () => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.get('/api/users',{
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(setUser(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const setUser = (data) => {
    return {
        type : 'SET_USER',
        payload : data
    }
}

export const startUpdateUser = (formData, clearAndToggle) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.put('/api/users', formData, {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                clearAndToggle()
                dispatch(setUser(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

export const logoutUser = () => {
    return {
        type : 'LOGOUT_USER'
    }
}