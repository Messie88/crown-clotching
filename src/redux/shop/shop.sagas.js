import { takeLatest, call, put, all } from "redux-saga/effects";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utilities";

import  { fetchCollectionsSuccess, fetchCollectionsFailure }  from "./shop.actions";

import ShopActionTypes from "./shop.types"; 

/* 
  Our general function that does the asynchronous code that we
  want to do.
  As we know, the function pause whenever we hit the yield until
  we call .next() and then our function continue as we saw.
  The whole purpose of saga middleware is to runs the sagas all
  concurrently, meaning it wants to run them all together in a
  way that does not block the execution.
*/
export function* fetchCollectionsAsync() {
    try {
      const collectionRef = firestore.collection('collection');
      const snapshot = yield collectionRef.get();
      const collectionsMap = yield call(
        convertCollectionsSnapshotToMap, 
        snapshot
      );
      yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
      yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}