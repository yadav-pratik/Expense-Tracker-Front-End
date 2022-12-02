const isLoggedInitialValue = localStorage.getItem('token') ? true : false

const isLoggedReducer = (state = isLoggedInitialValue, action) => {
    switch(action.type){
        case 'TOGGLE' : {
            return !state
        }
        default : {
            return state
        }
    }
}

export default isLoggedReducer