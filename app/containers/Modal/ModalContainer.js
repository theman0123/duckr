import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

function mapStateToProps ({modal, user}, props) {
  const duckTextLength = modal.duckText.length
  
  return {
    user: user[user.authedId] ? user[user.authedId] : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}
 
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...modalActionCreators,
    ...ducksActionCreators},
    dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
  