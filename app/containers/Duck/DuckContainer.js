import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { Duck } from 'components'
import { connect } from 'react-redux'

class DuckContainer extends React.Component {
  constructor (props) {
    super (props)
    
    this.state = {
      redirect: false,
      detail: false
    }
  }
  
  getDefaultProps () {
    return {
      hideRepyBtn: false,
      hideLikeCount: true,
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
    console.log('looking: location',this.props)
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

const { string, number, object, array, func, bool} = PropTypes
DuckContainer.propTypes = {
  duck: object.isRequired,
  handleClick: func,
  duckId: string.isRequired,
  numberOfLikes: number.isRequired,
  isLiked: bool.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired,
}

function mapStateToProps({ducks, likeCount, usersLikes, location}, props) {
  console.log('state and props', props)
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: false,//usersLikes[props.duckId] === true ? true : false,
    numberOfLikes: 2,//likeCount[props.duckId],
    location,
  }
}

export default withRouter(connect(
  mapStateToProps,
)(DuckContainer))
