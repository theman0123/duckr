import React from 'react'
import ReactDOM from 'react-dom'
import GetRoutes from './config/Routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension
  ? window.devToolsExtension()
  : (f) => f
))

ReactDOM.render(
  <Provider store={store} >
    <GetRoutes />
  </Provider>,
  document.getElementById('app')
)
