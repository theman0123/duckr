import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {redirect: false}
    
    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
    .then(() => this.setState({redirect: true}))
  }

  render () {
    const { redirect } = this.state
    
    return redirect === true 
      ? <Redirect to='/feed' /> 
      : <Authenticate
          error={this.props.error}
          isFetching={this.props.isFetching}
          onAuth={this.handleAuth}
        />
  }
}

function mapStateToProps ({users}) {
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticateContainer)
