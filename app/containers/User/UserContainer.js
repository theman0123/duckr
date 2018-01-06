import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User } from 'components'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import * as userActionCreators from 'redux/modules/users'
import { staleUser, staleDucks } from 'helpers/utils'

class UserContainer extends React.Component {
  componentDidMount () {
    const uid = this.props.match.params.uid

    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }
  }
  
  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds} />
    )
  }
}

UserContainer.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
  fetchAndHandleUsersDucks: PropTypes.func.isRequired,
  fetchAndHandleUser: PropTypes.func.isRequired,
  lastUpdated: PropTypes.number.isRequired,
}

function mapStateToProps ({users, usersDucks}, props) {
  const specificUsersDucks = usersDucks[props.match.params.uid]
  const user = users[props.match.params.uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
    lastUpdated: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersDucksActionCreators,
    ...userActionCreators,
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer))
