import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utilities";
// To use our reducers
import {connect} from 'react-redux';

import "./header.scss";

const Header = ({currentUser}) => (
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
        </div>
    </div>
)

// REDUX
/* The name here can be anything but mapStateToProps is standard
with redux codebases. This is a function that allows us to access
the states, with the state beig our root reducer. the state here
is the root state */
const mapStateToProps = (state) => ({
    /*
    state = root reducer,
    user = user value of our root reducer, which will give us our
    userReducer and from there we want,
    currentUser = current user state from our userReducer

     */
    currentUser: state.user.currentUser
});

/* now we get the value of our state and, remove the passing of
currentUser from our app state*/
export default connect(mapStateToProps)(Header);