import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

import rootReducer from './root-reducer';


const sagaMiddleware = createSagaMiddleware();

// to add multiple middlewares, we put them into an array
const middlewares = [sagaMiddleware];

/* e need the logger middleware only in developement. Not in
production(deploy) or test */
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

/* 
 After applyMiddleware runs, we'r going to use our sagaMiddleware
*/
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };



