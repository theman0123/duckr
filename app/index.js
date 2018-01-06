import React from 'react'
import ReactDOM from 'react-dom'
import GetRoutes from './config/Routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(combineReducers({...reducers, routing: routerReducer}),
  compose(
    applyMiddleware(thunk, middleware),
    window.devToolsExtension
      ? window.devToolsExtension()
      : (f) => f
))


ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <GetRoutes history={history}/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
