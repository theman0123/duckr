import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Duck } from 'components'
import { connect } from 'react-redux'
import * as usersLikesActions from 'redux/modules/userLikes'

class DuckContainer extends React.Component {
  constructor (props) {
    super (props)
    
    this.state = {
      redirect: false,
      detail: false
    }
  }
  

  goToProfile (e) {
    e.stopPropagation()
    this.setState(() => ({redirect: true, detail: false}))
  }
  
  handleClick() {
    e.preventDefault()
    this.setState(() => ({redirect: true, detail: true}))
  }
  
  render() {
    const { redirect, details } = this.state
    const props = this.props
    return redirect === false
      ? <Duck
          goToProfile={this.goToProfile}
          onClick={this.props.hideDetailBtn === true ? null : this.handleClick}
          {...props}
      />
      : detail === true 
      ? <Redirect to={`/duckDetails/${props.duck.uid}`} />
      : <Redirect to={`/duck/${props.duck.uid}`} />
  }
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
}

const { string, number, object, array, func, bool} = PropTypes
DuckContainer.propTypes = {
  duck: object.isRequired,
  handleClick: func,
  duckId: string.isRequired,
  numberOfLikes: number,
  isLiked: bool.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired,
}

function mapStateToProps({ducks, likeCount, userLikes, location}, props) {
  console.log('props and likeCount', props.duckId, likeCount[props.duckId])
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: userLikes[props.duckId] === true ? true : false,
    numberOfLikes: likeCount[props.duckId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckContainer)
