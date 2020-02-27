import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utilities";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
// To use our reducers
import {connect} from 'react-redux';

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import "./header.scss";

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div className="options">
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                currentUser ? 
                <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div> 
                : 
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        { hidden ? null : <CartDropdown /> }
    </div>
)

// REDUX
/* The name here can be anything but mapStateToProps is standard
with redux codebases. This is a function that allows us to access
the states, with the state beig our root reducer. the state here
is the root state */
/*
const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
});
 this is the same of what bellow*/
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

/* now we get the value of our state and, remove the passing of
currentUser from our app state*/
export default connect(mapStateToProps)(Header);