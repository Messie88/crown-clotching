import CartActionTypes from "./cart.type";

/* We don't had here the payload. Payload is an optional property
 */
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})