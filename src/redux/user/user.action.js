import { UserActionTypes } from "./user.type";

// Here we're goin' to put our action creators

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})