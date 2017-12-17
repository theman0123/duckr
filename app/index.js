import React from 'react'
import ReactDOM from 'react-dom'
import GetRoutes from './config/Routes'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import users from 'redux/modules/user'

const store = createStore(users, compose(
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
