import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { auth, CreateUserProfileDocument } from "./firebase/firebase.utilities";

import './App.css';

import Header from "./components/header/header";
import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
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
         this.setState({
           currentUser: {
             id: snapShot.id,
             ...snapShot.data()
           }
         });
       });
     } else {
         this.setState({currentUser: userAuth});
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
      <Header currentUser={this.state.currentUser}  />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
  }
}

export default App;
