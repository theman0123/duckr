import React from 'react'
import { Home, Authenticate} from 'components'
import auth from 'helpers/auth'

class AuthenticateContainer extends React.Component {
  
  handleAuth() {
    auth().then((user) => {
      console.log('authenticated user', user)     
    })
  }
  
  render () {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        error=''
        isFetching={false}
      />
    )
  }
}

export default Authenticate
