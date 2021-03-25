import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { throttle } from 'lodash'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { loadState, saveState } from './state/persist'


import reducer from './state/reducer'
import reportWebVitals from './reportWebVitals';

const persistedState = loadState()

const store = createStore(reducer, persistedState)

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 500))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
