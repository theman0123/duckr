import React from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'

class FeedContainer extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {redirect: false}
  }
    
    componentWillMount() {
      console.log('feed')
    }

  render () {
    return (
      <Feed />
    )
  }
}

export default FeedContainer
