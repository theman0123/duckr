import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers'
import { Navigation } from 'components'
import { fakeAuth } from 'helpers/auth'
import { container } from 'containers/Main/styles.css'

class GetRoutes extends React.Component {
  render () {
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(props) => (
          this.props.isAuthed === true
            ? <Component {...props} />
            : <Redirect to='/auth' />
        )} />
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <MainContainer>
              <Route exact path='/' component={HomeContainer} />
              <Route exact path='/auth' component={AuthenticateContainer} />
              <Route exact path='/logout' component={LogoutContainer} />
              <PrivateRoute path='/feed' component={FeedContainer} />
            </MainContainer>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect((state) => ({isAuthed: state.isAuthed}))(GetRoutes)
