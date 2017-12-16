import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers'
import { Navigation } from 'components'
import { fakeAuth } from 'helpers/auth'
import { container } from 'containers/Main/styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class GetRoutes extends React.Component {
  constructor (props) {
    super(props)
    
  }
  
  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        console.log('componentdidmount', userInfo)
//        if (this.props.location.pathname === '/') {
//          //reidrect to feed
//        }
      } 
//      else {
//        this.props.removeFetching()
//      }
      
  })
}
  render () {
    const redirect = this.props.isAuthed && !this.props.isFetching

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(props) => (
          redirect === true
            ? <Component {...props} />
            : <Redirect to='/auth' />
        )} />
      )
    }
  console.log('redirect', redirect)
  console.log(this.props)
    return (
      <BrowserRouter>
        <div>
          <div className={container}>
            <Navigation isAuthed={this.props.isAuthed} />
              <Switch>
                <Route exact path='/' component={MainContainer} />
                <Route exact path='/auth' component={AuthenticateContainer} />
                <Route exact path='/logout' component={LogoutContainer} />
                <PrivateRoute path='/feed' component={FeedContainer} />
              </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(
  (state) => ({isAuthed: state.isAuthed, isFetching: state.isFetching}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(GetRoutes)
