import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import isLoggedReducer from '../reducers/isLoggedReducer'
import budgetReducer from '../reducers/budgetReducer'
import categoriesReducer from '../reducers/categoriesReducer'
import expensesReducer from '../reducers/expensesReducer'

const configureStore = () => {
    return createStore(combineReducers({
        user : userReducer,
        isLogged : isLoggedReducer,
        budget : budgetReducer,
        categories : categoriesReducer,
        expenses : expensesReducer
    }), applyMiddleware(thunk))
}

export default configureStore