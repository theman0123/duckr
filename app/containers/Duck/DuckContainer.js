import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Duck } from 'components'
import { connect } from 'react-redux'
import * as usersLikesActions from 'redux/modules/userLikes'

class DuckContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      redirect: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.goToProfile = this.goToProfile.bind(this)
  }

  goToProfile (e) {
    e.stopPropagation()
    this.setState(() => ({redirect: true}))
  }

  handleClick (e) {
    e.preventDefault()
    this.setState(() => ({redirect: true}))
  }

  render () {
    const { redirect, details } = this.state

    return (  
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props}
      />
    )
  }
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
}

const { string, number, object, func, bool } = PropTypes
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

function mapStateToProps ({ducks, likeCount, userLikes, location}, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: userLikes[props.duckId] === true,
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
