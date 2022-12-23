import axios from 'axios'
import { normalAlert } from '../Helper Functions/sweetAlerts'

export const startGetCategories = () => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.get('/api/categories', {
                    headers : {
                        authorization : localStorage.getItem('token')       
                    }
                })
                dispatch(setCategories(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

export default startGetCategories

const setCategories = (categories) => {
    return {
        type : 'SET_CATEGORIES',
        payload : categories
    }
}

export const startAddCateogry = (updateData, clearField) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.post('/api/categories',updateData, {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                if(data.hasOwnProperty('errors')){
                    normalAlert(data._message, 'info')
                } else {
                    clearField()
                    dispatch(addCategory(data))
                }
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const addCategory = (category) => {
    return {
        type : 'ADD_CATEGORY',
        payload : category
    }
}

export const startDeleteCategory = (id) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.delete(`/api/categories/${id}`,{
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(deleteCategory(data._id))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const deleteCategory = (id) => {
    return {
        type : 'DELETE_CATEGORY',
        payload : id
    }
}

export const startUpdateCategory = (updateData, id, handleToggle) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.put(`/api/categories/${id}`, updateData, {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                handleToggle()
                dispatch(updateCategory(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const updateCategory = (data) => {
    return {
        type : 'UPDATE_CATEGORY',
        payload : data
    }
}