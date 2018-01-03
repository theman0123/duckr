import React from 'react'
import PropTypes from 'prop-types'
import { DuckDetails } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'

class DuckDetailsContainer extends React.Component {
  componentDidMount () {
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
    ...likeCountActionCreators
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer))
