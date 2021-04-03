import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/app/App';
import Cart from './components/cart/Cart'
import Layout from './components/layout/Layout'
import BookPage from './components/book-page/BookPage'
import CategoryPage from './components/category-page/CategoryPage'
import { throttle } from 'lodash'
import { BrowserRouter as Router, Route } from "react-router-dom";
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

const routing = (
  <Router>
    <Layout>
      <Route exact path='/' component={App}/>
      <Route path='/cart' component={Cart}/>
      <Route path='/book/:bid' component={BookPage}/>
      <Route path='/category/:category' component={CategoryPage}/>
    </Layout>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    {routing}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
