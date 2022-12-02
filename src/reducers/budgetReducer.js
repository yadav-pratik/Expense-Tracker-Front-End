const budgetInitialValue = {}

const budgetReducer = (state = budgetInitialValue, action) => {
    switch(action.type){
        case 'LOGOUT_USER' : {
            return {}
        }
        case 'SET_BUDGET' : {
            return {...action.payload}
        }
        case 'SET_BUDGET_AMOUNT' : {
            return {...state, amount : action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default budgetReducer