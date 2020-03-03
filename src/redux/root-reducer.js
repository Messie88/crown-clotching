// To combine all the reducers together
import { combineReducers } from 'redux';

// PERSISTENCE
// 1
import { persistReducer } from 'redux-persist'
/* 2 the type of storage we want. Done as bellow, we will get 
the actual local storage object on our window browser*/
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
    /* Our key here is root, essentially meaning at what point
    inside of our reducer object do we want to start storing
    everything*/
    key: 'root',
    storage,
    /* The whitelist prop is an aray containig the string names
    of any reducer that we want to store. We persist here cart,
    becoz user is persisted by firebase authentication */
    whitelist: ['cart']
};

/* we have then to call our root reducer bcoz we have to wrapp 
combineReducers(...) inside of our new persist reducer call*/
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);


/*
the export without persistence: export default combineReducers({
    user: userReducer,
    cart: cartReducer
}) 
*/