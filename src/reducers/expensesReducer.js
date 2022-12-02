const expensesInitialValue = []

const expensesReducer = (state = expensesInitialValue, action) => {
    switch(action.type){
        case 'SET_EXPENSES' : {
            return [...action.payload]
        }
        case 'ADD_EXPENSE' : {
            return [...state, {...action.payload}]
        }
        case 'UPDATE_EXPENSE' : {
            return state.map(exp => {
                if(exp._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return {...exp}
                }
            })
        }
        default : {
            return [...state]
        }
    }
}

export default expensesReducer