import { saveDuck, fetchDuck } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

const fetchingDuck = () => {
  return {
    type: FETCHING_DUCK,
  }
}

const fetchingDuckError = (error) => {
  console.warn(error)
  return {
    type: FETCHING_DUCK_ERROR,
    error: 'Error fetching Duck',
  }
}

const fetchingDuckSuccess = (duck) => {
  return {
    type: FETCHING_DUCK_SUCCESS,
    duck,
  }
}

export const removeFetching = () => {
  return {
    type: REMOVE_FETCHING,
  }
}

const addDuck = (duck) => {
  return {
    type: ADD_DUCK,
    duck,
  }
}

export const addMultipleDucks = (ducks) => {
  return {
    type: ADD_MULTIPLE_DUCKS,
    ducks,
  }
}

export function duckFanout (duck) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveDuck(duck)
      .then((duckWithID) => {
        dispatch(addDuck(duckWithID))
        dispatch(closeModal())
        dispatch(addSingleUsersDuck(uid, duckWithID.duckId))
    })
    .catch((error) => {
      console.warn('error in duckFanout', error)
    })
  }
}

export function fetchAndHandleDuck (duckId) {
  return function (dispatch) {
    dispatch(fetchingDuck())
    
    fetchDuck(duckId)
      .then((duck) => dispatch(fetchingDuckSuccess(duck)))
      .catch((error) => dispatch(fetchingDuckError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function ducks (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DUCK:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_DUCK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck,
      }
    case REMOVE_FETCHING:
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case ADD_MULTIPLE_DUCKS:
      return {
        ...state,
        ...action.ducks,
      }
    default :
      return state
  }
}
