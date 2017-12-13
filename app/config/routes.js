import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MainContainer } from 'containers'

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={MainContainer} />
    </Switch>
  </BrowserRouter>
)

export default routes
