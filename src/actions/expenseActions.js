import axios from 'axios'
import swal from 'sweetalert'

export const startGetExpenses = () => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.get('http://localhost:3040/api/expenses', {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(setExpenses(data))
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                const {data} = await axios.post('http://localhost:3040/api/expenses', formData, {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                clear()
                dispatch(addExpense(data))
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                const {data} = await axios.put(`http://localhost:3040/api/expenses/${id}/?action=${action}`, {} , {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(updateExpense(data))
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                const {data} = await axios.put(`http://localhost:3040/api/expenses/${id}/?action=update`, formData , {
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                clear()
                dispatch(updateExpense(data))
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })
            }
        }
    )
}