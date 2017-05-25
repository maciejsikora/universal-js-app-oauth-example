import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter  } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from '../src/reducer.js';
import App from './app.js';

const initState = window.__STATE__;
delete window.__STATE__; // not needed anymore

// Create Redux store with initial state
const store = createStore(reducer.main, initState);
// start the app
window.initApp = (url) => {
  window.onload = () => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter context={{}} location={url}>
          <App/>
        </BrowserRouter>
      </Provider>
      , document.getElementById('app'));
  };
};
