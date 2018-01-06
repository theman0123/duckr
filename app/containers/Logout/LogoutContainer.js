import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Logout } from 'components'
import { logoutAndUnauthed } from 'redux/modules/user'

class LogoutContainer extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(logoutAndUnauthed())
  }
  render() {
    return (
    <Logout />
    )
  }  
}

LogoutContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LogoutContainer)
