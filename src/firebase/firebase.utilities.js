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

/* Storing the user in firebase. To take the user object that we got back from our 
authentication library and then store inside our DB. We use 
here async because we're doing an api request.
userAuth we get it back from firebase library*/
export const CreateUserProfileDocument = async(userAuth, additionalData) => {
    /* if the user doesn't exist, return the current function
    which mean, exit from the CreateUserProfileDocument*/
    if (!userAuth) return;
    //The reference
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    /*The snapShot tells us whether or not there user exist.
    if it exists, it will get it back*/
    const snapShot = await userRef.get();
    // The code below create the snapshot(data)
    if (!snapShot.exists) {
        /*To create the new user, we're gonna use the userRef
        because in order for us to create, we have to use the
        documentReference object not the snapshot. The snapshot
        simply represents the data.
        */
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        // The .set() allows us to create a new user
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
   return userRef;
};

firebase.initializeApp(config);
//To access firebase auth
export const auth = firebase.auth();
//To access the firebase DB
export const firestore = firebase.firestore();

///////////// SETUP OF GOOGLE AUTHENTICATION UTILITIES. START
const provider = new firebase.auth.GoogleAuthProvider();
// To always trigger the Google pop-up
provider.setCustomParameters({prompt: 'select_account'});
/* Signin google method. signInWithPopup takes the provider
class that me made, but it takes it for many different types
of popups. Here we just want the Google one. There's a twitter
one and all kinds available to us in our sign*/
export const signInWithGoogle = () => auth.signInWithPopup(provider);
///////////// SETUP OF GOOGLE AUTHENTICATION UTILITIES. END

//In case we want the whole library
export default firebase;
