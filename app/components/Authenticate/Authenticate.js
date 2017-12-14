import React from 'react'
import PropTypes from 'prop-types'
import { Home, FacebookAuthButton } from 'components'

import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'

const Authenticate = ({isFetching, error, onAuth}) => {
//  console.log(onAuth)
    return (
      
      <div className={centeredContainer}>
        
        <h1 className={largeHeader}>{'Authenticate'}</h1>
        <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
          
        {error ? <p className={errorMsg}>{error}</p> : null}
      </div>
    
    )
}

Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default Authenticate
