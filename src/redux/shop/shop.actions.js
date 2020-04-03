import ShopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utilities'

/* THE REDUX WAY
export const updateCollections = collectionsMap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})
*/

/* THE THUNK WAY */

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});
export const fetchCollectionsStartAsync = ()=> {
    return dispatch => {
        const collectionRef = firestore.collection('collection');
        // We can do this because of the reduxthunk library
        dispatch(fetchCollectionsStart())

        collectionRef.get().then( snapshot => {
        const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionsSuccess(collectionsMap));
      }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}