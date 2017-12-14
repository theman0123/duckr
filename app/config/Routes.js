import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { MainContainer, AuthenticateContainer } from 'containers'

class Routes extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div>          
          <Switch>
            <Route exact path='/' component={MainContainer} />
            <Route exact path='/auth' component={AuthenticateContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes
