import auth from 'helpers/auth'

//Users
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'



// Users
 const authUser = (uid) => {
  return {
    type: AUTH_USER,
    uid,
  }
}

const unauthUser = () => {
  return {
    type: UNAUTH_USER,
  }
}

const fetchingUser = () => {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  }
}

const fetchingUserSuccess = (uid, user, timestamp) => {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}
 
export const fetchAndHandleAuthedUser = () => {
  return function (dispatch) {
        dispatch(fetchingUser())
    auth().then((user) => {
      console.log('authenticated user', user)
      dispatch(fetchingUserSuccess(user.uid, user, Date.now()))
      dispatch(authUser(user.uid))
    })
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}
  
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  }
}

function user(state = initialUserState, action) {
  switch(action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        lastUpdate: timestamp,
        info: action.user,
      }
    default:
      return state
  }
}


const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.id, 
      }
     case UNAUTH_USER:
       return {
         ...state,
         isAuthed: false,
         authedId: ''
       }
      case FETCHING_USER:
       return {
         ...state,
         isFetching: true,
       }
      case FETCHING_USER_FAILURE:
       return {
         ...state,
         isFetching: false,
         error: action.error,
       }
      case FETCHING_USER_SUCCESS:
        return action.user === null 
      ? {
        ...state,
        error: '',
        isFetching: false,
      }
      : {
        ...state,
        error: '',
        isFetching: false,
        [action.uid]: {
          info: user(state[action.uid], action.user),
          lastUpdate: action.timestamp,
        }
      }
    default: 
      return state
  }
}
