import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import { List } from 'immutable'

class FeedContainer extends React.Component {

  componentDidMount() {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed 
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        duckIds={this.props.duckIds}
      />
    )
  }
}
function mapStateToProps ({feed}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed

  return {
    newDucksAvailable: feed.get('newDucksAvailable'),
    error: feed.get('error'),
    isFetching: feed.get('isFetching'),
    duckIds: feed.get('duckIds'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

FeedContainer.propTypes = {
  duckIds: PropTypes.instanceOf(List),
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer)
