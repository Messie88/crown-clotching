import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item"
import { selectCartItems } from "../../redux/cart/cart.selectors";

import "./cart-dropdown.scss";

const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(
                    cartItem =>
                  <CartItem key={cartItem.id} item={cartItem} />
                )
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = (state) => ({
    /* this will make sure that our cart dropdown component
    is not getting rerendered when ever the state changes that's
    unrelated to the cart items.*/
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);
