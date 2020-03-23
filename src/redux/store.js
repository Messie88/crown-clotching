import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// logger here is how middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// to add multiple middlewares, we put them into an array
const middlewares = [];

/* e need the logger middleware only in developement. Not in
production(deploy) or test */
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };



