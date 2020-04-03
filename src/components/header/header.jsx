import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
//import { auth } from "../../firebase/firebase.utilities";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.action";

import {connect} from 'react-redux';

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { HeaderContainer, LogoContainer, OptionsContainer , OptionLink } from "./header.styles";

const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
          <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/'>CONTACT</OptionLink>
            {
                currentUser ? 
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink> 
                : 
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : <CartDropdown /> }
    </HeaderContainer>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())

})

/* now we get the value of our state and, remove the passing of
currentUser from our app state*/
export default connect(mapStateToProps, mapDispatchToProps)(Header);