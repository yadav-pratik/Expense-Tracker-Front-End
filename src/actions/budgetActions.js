import axios from 'axios'
import { normalAlert } from '../Helper Functions/sweetAlerts'

export const startGetBudget = () => {

    return (
        async (dispatch) => {
            try {
                const { data } = await axios.get('/api/budget',{
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(setBudget(data))
            } catch (error) {
                normalAlert(error.message, 'error')
            }
        }
    )
}

const setBudget = (budget) => {
    return {
        type : 'SET_BUDGET',
        payload : budget
    }
}

export const setBudgetAmount = (amount) => {
    return {
        type : 'SET_BUDGET_AMOUNT',
        payload : Number(amount)
    }
}

export const startUpdateBudget = (budget) => {
    return (
        async (dispatch) => {
            try {
                const {data} = await axios.put(`/api/budget/${budget._id}`, {amount : budget.amount},{
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(setBudget(data))
                normalAlert('Budget Updated!', 'success')
            } catch (error) {
                normalAlert(error.message, 'error')              
            }
        }
    )
}