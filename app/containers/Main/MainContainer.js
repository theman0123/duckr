import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router'

import { HomeContainer } from 'containers'
import { Navigation } from 'components'
import Unknown from 'config/Unknown'

import { container, innerContainer } from './styles.css'

class MainContainer extends React.Component {
  render () {
    return (
      <div className={container}>
        
        <Navigation isAuthed={false} />
        
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

export default MainContainer
