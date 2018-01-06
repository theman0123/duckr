import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { Navigation } from 'components'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import * as usersLikesActionCreators from 'redux/modules/userLikes'
import { container, innerContainer } from './styles.css'


class MainContainer extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {redirect: false}
  }
   
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        this.setState({redirect: true})
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  
  render () {
    if (this.state.redirect === true) {
      this.setState({redirect:false})
      return <Redirect to='/feed' /> 
    }
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired,
  setUsersLikes: PropTypes.func.isRequired,
}

export default connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
    ...usersLikesActionCreators
  }, dispatch)
)(MainContainer)
