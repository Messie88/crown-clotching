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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    /* The thing about firebase is that, we can only make one set
    call at the time. The thing to consider is that, bcoz each call
    is individual, they fire one at a time. If our internet connection
    stops halways through, we'll have saved only half of those 
    documents bcoz the other half ould not have made it to the 
    server. Now this is bad bcoz our code becomes unpredictable.
    We want to know that if we hit our function and all of our
    requests send, all of them should set. inf any of them fail
    we want the whole thing to fail bcoz then we anticipate that, 
    Our code is consistent. So to do that, we have to do what's 
    called a BATCH RIGHT.
    A BATCH RIGHT is essentially just a way to batch or to group
    all our calls together into one big request.
    Firestore gives us a batch object, with which we just add all
    of 4 e.g sets into it and then we fired off whenever we're adding
    all the calls we want to it */
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        /* The code above says to firebase to gives us a new documentRef
        in this collection and randomly generate an id for it */
        const newDocRef = collectionRef.doc();

        batch.set(newDocRef, obj);
    });

    /* .commit() will fire off our batch request. It returns back
    a promsise. When commit succeeds, it will come back and resolve
    a void value, meaning a null value. And that's useful for us
    bcoz if we call the addCollectionAndDocuments function somewhere,
    we can chain off this function and then cal .then() and do something
    if the call succeed or we can handle the errors as well. */
    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
    });
    
    /* The empty object we pass to our reduce function is our
    initial accumulator */
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

// For our saga persistence
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

firebase.initializeApp(config);
//To access firebase auth
export const auth = firebase.auth();
//To access the firebase DB
export const firestore = firebase.firestore();

///////////// SETUP OF GOOGLE AUTHENTICATION UTILITIES. START
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// To always trigger the Google pop-up
googleProvider.setCustomParameters({prompt: 'select_account'});
/* Signin google method. signInWithPopup takes the provider
class that me made, but it takes it for many different types
of popups. Here we just want the Google one. There's a twitter
one and all kinds available to us in our sign*/
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
///////////// SETUP OF GOOGLE AUTHENTICATION UTILITIES. END

//In case we want the whole library
export default firebase;
