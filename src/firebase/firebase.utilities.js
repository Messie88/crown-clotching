import firebase from 'firebase/app'
//for the DB
import 'firebase/firestore';
//for the authentication
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBqsv1jSESrev-66RkzHAr9xPljBFUmCTc",
    authDomain: "crown-db-6e5a3.firebaseapp.com",
    databaseURL: "https://crown-db-6e5a3.firebaseio.com",
    projectId: "crown-db-6e5a3",
    storageBucket: "crown-db-6e5a3.appspot.com",
    messagingSenderId: "89542660768",
    appId: "1:89542660768:web:f8fda68bec3af32e112fc5",
    measurementId: "G-CEE0H8WY1B"
};

firebase.initializeApp(config);
//To access firebase auth
export const auth = firebase.auth();
//To access the firebase DB
export const firestore = firebase.firestore();

//Setup of google authentication utilities
const provider = new firebase.auth.GoogleAuthProvider();
// To always trigger the Google pop-up
provider.setCustomParameters({prompt: 'select_account'});
/* signin google method. signInWithPopup takes the provider
class that me made, but it takes it for many different types
of popups. Here we just wont the Google one. There's a twitter
one and all kinds available to us in our sign*/
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//In case we want the whole library
export default firebase;