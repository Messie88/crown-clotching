import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { auth, CreateUserProfileDocument } from "./firebase/firebase.utilities";
import {connect} from 'react-redux';

import './App.css';

import Header from "./components/header/header";
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { setCurrentUser } from "./redux/user/user.action";
class App extends React.Component {
  
  /* onAuthStateChange is an observer(listener) and it return 
  method that stop the observer, which here we call unsubscribeFromAuth,
  which mean when we call it it closes the subscription*/
  unsubscribeFromAuth = null;

  /* Firebase subscribtion. Make our fetch. Here we know
  weither the use sign in o sign out. When we call the 
  onAuthStageChanged(method from auth lirary),it takes inside
  a function where the userAuth parameter is the user state is 
  on auth firebase project. auth.onAuthStageChanged opens 
  subscription. It's a opening message system between our app 
  and firebase. Whenever any changes occur on Firebase from any 
  source related to this app,Firebase sends out a message that 
  says the auth status change, the user has updated or sign out
   */
  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     //DATA PERSISTENCE. if the user sign in
      if(userAuth) {
        /*This is the query reference. Check if our DB has updated 
        at that reference with any new data. onSnapshot is
        similar to onAuthStateChange */
       const userRef = await CreateUserProfileDocument(userAuth);
       /* If the user exist, store him to the our app. This is the
        query Snapshot. The .data() allows us to get the actual
         properties of the object*/
       userRef.onSnapshot(snapShot => {
         //setCurrentUser = our redux state
         setCurrentUser({
             id: snapShot.id,
             ...snapShot.data()
           });
       });
     } else {
         setCurrentUser( userAuth );
     }
    });
  }
  //This will close subscription
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin' 
          render={
          () => this.props.currentUser ? 
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
/* The state here is only useful for our Redirect */
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

/* 
What dispatch is, it is a way for Redux to know whatever
object you're passing to it is going to be an action object 
that we're goind to pass to every reducer. So our user action
(setCurrentUser) is a function that gets the user but returns an action object 
*/
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
