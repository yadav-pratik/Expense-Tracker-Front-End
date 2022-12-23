import axios from 'axios'
import { normalAlert } from '../Helper Functions/sweetAlerts'

export const startGetExpenses = () => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.get('/api/expenses', {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(setExpenses(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const setExpenses = (expenses) => {
    return {
        type : 'SET_EXPENSES',
        payload : expenses
    }
}

export const startAddExpense = (formData, clear) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.post('/api/expenses', formData, {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                clear()
                dispatch(addExpense(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const addExpense = (expense) => {
    return {
        type : 'ADD_EXPENSE',
        payload : expense
    }
}

export const startDeleteExpense = (id, action) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.put(`/api/expenses/${id}/?action=${action}`, {} , {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(updateExpense(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const updateExpense = (expense) => {
    return {
        type : 'UPDATE_EXPENSE',
        payload : expense
    }
}
 
export const startUpdateExpense = (formData, clear, id) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.put(`/api/expenses/${id}/?action=update`, formData , {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                clear()
                dispatch(updateExpense(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}