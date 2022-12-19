import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { toggleIsLogged } from '../../actions/isLoggedActions'
import { logoutUser } from '../../actions/userActions'
import { startGetCategories } from '../../actions/categoryActions'
import { startGetExpenses } from '../../actions/expenseActions'

import { handleLogout } from '../../Helper Functions/sweetAlerts'

import ExpenseContainer from './ExpenseContainer'
import StatsContainer from './StatsContainer'
import { startGetBudget } from '../../actions/budgetActions'

const Dashboard = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetBudget())
        dispatch(startGetExpenses())
        dispatch(startGetCategories())
    },[dispatch])

    const handleClick = () => {
        const logoutAndRedirect = () => {
            localStorage.removeItem('token')
            dispatch(toggleIsLogged())
            dispatch(logoutUser())
            props.history.push('/')
        }

        handleLogout(logoutAndRedirect)
    }

    return (
        <div>
            <div className='row mb-4'>
                <h2 className='col-md-10'>User Dashboard</h2>
                <button 
                    className='col btn btn-secondary shadow' 
                    onClick={handleClick}
                    style={{marginRight : '10px'}}
                >Logout</button>
            </div>
            <StatsContainer />
            <ExpenseContainer />
        </div>
    )
}

export default Dashboard