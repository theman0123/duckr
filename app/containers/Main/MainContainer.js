import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import { HomeContainer } from 'containers'
import { Navigation } from 'components'
import Unknown from 'config/Unknown'

import { innerContainer } from './styles.css'

class MainContainer extends React.Component {
  render () {
    return (  
      <div className={innerContainer}>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
        </Switch>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({isAuthed: state.isAuthed}),
)(MainContainer)
