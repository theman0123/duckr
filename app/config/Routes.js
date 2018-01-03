import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers'

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
          <MainContainer />
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route exact path='/auth' component={AuthenticateContainer} />
            <Route exact path='/logout' component={LogoutContainer} />
            <PrivateRoute exact path='/feed' component={FeedContainer} />
            <PrivateRoute path='/duckDetails/:duckId' component={DuckDetailsContainer} />
            <PrivateRoute path='/:uid' component={UserContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

GetRoutes.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default connect((state) => ({isAuthed: state.users.isAuthed}))(GetRoutes)
