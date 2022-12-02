const categoriesInitialValue = []

const categoriesReducer = (state = categoriesInitialValue, action) => {
    switch(action.type) {
        case 'LOGOUT_USER' : {
            return []
        }
        case 'SET_CATEGORIES' : {
            return [...action.payload]
        }
        case 'ADD_CATEGORY' : {
            return [...state, {...action.payload}]
        }
        case 'DELETE_CATEGORY' : {
            return state.filter(category => {
                return category._id !== action.payload
            })
        }
        case 'UPDATE_CATEGORY' : {
            return state.map(category => {
                if(category._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return {...category}
                }
            })
        }
        default : {
            return [...state]
        }
    }
}

export default categoriesReducer