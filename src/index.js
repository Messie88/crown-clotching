import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';

import store from './redux/store';

/* Provider is the component class than we get from react-redux
that once passed the store object, will ba able to give that 
redux store context to the rest of the app. So we can dispatch
actions to that store or, we can actually pull values off of 
the store and into our components. And all comes from the 
Provider */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
       <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
