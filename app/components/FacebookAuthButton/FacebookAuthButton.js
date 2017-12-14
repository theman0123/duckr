import React from 'react'
import PropTypes from 'prop-types'

import {button} from './styles.css'

const FacebookAuthButton = ({isFetching, onAuth}) => {
  return (
    <button className={button} onClick={onAuth}>
      {isFetching === true
        ? 'Loading'
        : 'Login with Facebook'}
    </button>
  )
}

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default FacebookAuthButton
  