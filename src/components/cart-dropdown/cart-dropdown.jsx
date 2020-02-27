import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item"

import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import "./cart-dropdown.scss";

/* Once passed the mapStateToProps, connect() is aware of the
dispatch, so it's not necessary to write mapDispatchToProps */ 
const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.map(
                    cartItem =>
                  <CartItem key={cartItem.id} item={cartItem} />
                )
                : 
                <span className='empty-message'>
                    Your cart is empty
                </span>
            }
        </div>
        <CustomButton onClick = {() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

/* this will make sure that our cart dropdown component
is not getting rerendered when ever the state changes that's
unrelated to the cart items.*/
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDropdown));
