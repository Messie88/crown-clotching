import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';

import Header from "./components/header/header";
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import CheckoutPage from "./pages/checkout/checkout";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.action";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  //This will close subscription
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    const {currentUser} = this.props
    return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' 
          render={
          () => currentUser ? 
          (<Redirect to='/' />)
          :
          (<SignInAndSignUpPage />)
          } 
          />
      </Switch>
    </div>
  );
  }
}
// REDUX
/* The state here is only useful for our Redirect 
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})
*/
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

// For the sign in persistence
const mapDispatchToProps = dispatch =>({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
