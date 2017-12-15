import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import { HomeContainer } from 'containers'
import { Navigation } from 'components'
import Unknown from 'config/Unknown'

import { container, innerContainer } from './styles.css'

class MainContainer extends React.Component {
  render () {
    console.log()
    return (
      <div className={container}>
        
        <Navigation isAuthed={this.props.isAuthed} />
        
        <div className={innerContainer}>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route component={Unknown} />
          </Switch>
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default connect(
  (state) => ({isAuthed: state.isAuthed})
)(MainContainer)
