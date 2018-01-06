import React from 'react'
import PropTypes from 'prop-types'
import { DuckDetails } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as replyActionCreators from 'redux/modules/replies'

class DuckDetailsContainer extends React.Component {
  componentDidMount () {
//    if (this.props.location.pathname === '/duckDetails/index_bundle.js') {
//      //won't fire since it needs to serve up index_bundle.js on the server side to enter the app. not sure how to fix it
//      console.log(this.props.location.history)
//    }
    this.props.initLikeFetch(this.props.duckId)
    
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    }
    else {
      this.props.removeFetching()
    }
  }
  
  render() {
    return (
      <DuckDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error}/>
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleDuck: PropTypes.func.isRequired,
  initLikeFetch: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.match.params.duckId,
    duckAlreadyFetched: !!ducks[props.match.params.duckId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...replyActionCreators,
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer))
