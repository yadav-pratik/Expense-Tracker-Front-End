const initialUserValue = {}

const userReducer = (state = initialUserValue, action) => {
    switch(action.type) {
        case 'SET_USER' : {
            return {...action.payload}
        }
        case 'LOGOUT_USER' : {
            return {}
        }
        default : {
            return {...state}
        }
    }
}

export default userReducer