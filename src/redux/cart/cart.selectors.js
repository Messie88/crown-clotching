/* Our memoized selectors. This allows ius to use the count in 
many places in our app */

import { createSelector } from 'reselect';

// There are actually 2 types of selectors

/* 1 - input selector that doesn't use createSelector. input
selector is a function that usually takes the naming structure
bellow. It is a function that gets the whole state and just 
returns a slice of it. Here we're goind to get the whole cart
reducer state */
const selectCart = state => state.cart;

/* 2 - output selector that does use input selector and 
createSelector to build themselves*/
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
        0
      )
);