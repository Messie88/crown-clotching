import CartActionTypes from "./cart.type";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                //hidden here = false
                hidden: !state.hidden
            }

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                // action.payload is the item we want to add
                cartItems: addItemToCart( state.cartItems, action.payload )
            }
    
        default:
            return state;
    }
};

export default cartReducer;