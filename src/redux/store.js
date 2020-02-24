import { createStore, applyMiddleware } from 'redux';
// logger here is how middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// to add multiple middlewares, we put them into an array
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;


