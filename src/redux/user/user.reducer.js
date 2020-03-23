import { UserActionTypes } from "./user.type";

// Istantiate state
const INITIAL_STATE = {
    currentUser: null
}

/* 
    state = INITIAL_STATE means, if the state is undefined(if
    it's not set), then useReducer will fall back and leverage
    this INITIAL_SATE VALUE we passed him
*/

const userReducer = (state = INITIAL_STATE, action) => {
    /* action has 2 params: type and payload. action here is 
    what we def in user.action.js file */
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            
            return  {
                ...state,
                currentUser: action.payload
            };
    
        default:
            return state;
    }
}

export default userReducer;