import axios from 'axios'
import swal from 'sweetalert'

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
                swal({
                    title : error.message,
                    icon : 'error'
                })
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
                const {data} = await axios.put(`api/budget/${budget._id}`, {amount : budget.amount},{
                    headers : {
                        authorization : localStorage.getItem('token')
                    }
                })
                dispatch(setBudget(data))
            } catch (error) {
                swal({
                    title : error.message,
                    icon : 'error'
                })                
            }
        }
    )
}