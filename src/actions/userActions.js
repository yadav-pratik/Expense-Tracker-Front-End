import axios from 'axios'
import swal from 'sweetalert'

export const startRegisterUser = (formData, clearAndRedirect) => {
    return (
        async () => {
            try {
                const { data } = await axios.post('/api/users',formData)
                if(data.hasOwnProperty('errors')){
                    // alert(data.message)
                    swal({
                        title : data.message,
                        icon : 'info'
                    })
                } else {
                    // alert(data.success)
                    swal({
                        title : data.success,
                        icon : 'success'
                    })
                    clearAndRedirect()
                }
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                    swal({
                        title : data.notice,
                        icon : 'error'
                    })
                } else if(data.hasOwnProperty('errors') || data.hasOwnProperty('message')){
                    swal({
                        title : data.message,
                        icon : 'error'
                    })
                } else {
                    swal({
                        title : 'Login Successful',
                        icon : 'success'
                    })
                    localStorage.setItem('token',data.token)
                    clearAndRedirect()
                }
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                        authorization : localStorage.getItem('token'),
                        "Content-Type ": "multipart/form-data"
                    }
                })
                clearAndToggle()
                dispatch(setUser(data))
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
            }
        }
    )
}

export const logoutUser = () => {
    return {
        type : 'LOGOUT_USER'
    }
}