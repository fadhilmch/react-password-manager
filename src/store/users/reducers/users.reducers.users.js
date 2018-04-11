import {
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REJECTED,
  LOGIN_USER_REQUESTED,
  SIGNUP_USER_FULFILLED,
  SIGNUP_USER_REJECTED,
  SIGNUP_USER_REQUESTED,
  LOGOUT_USER_FULFILLED,
  LOGOUT_USER_REJECTED, 
  LOGOUT_USER_REQUESTED
} from '../users.actionTypes'

const initialState = {
  isLogin: false,
  id: '',
  email: '',
  loading: false,
  error: {
    status: false,
    message: ''
  }
}

const reducers = (state = {...initialState}, action) => {
  switch(action.type) {
    case LOGIN_USER_FULFILLED: 
      return {
        ...state,
        loading: false,
        isLogin: true,
        id: action.payload.id,
        email: action.payload.email,
        error: {
          status: false,
          message: ''
        }
      }
    case LOGIN_USER_REJECTED: 
      return {
        ...state,
        error: {
          status: true,
          message: 'Error login'
        },
        loading: false
      }
    case LOGIN_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    case SIGNUP_USER_FULFILLED: 
    return {
      ...state,
      loading: false,
      isLogin: true,
      id: action.payload.id,
      email: action.payload.email,
      error: {
        status: false,
        message: ''
      }
    }
    case SIGNUP_USER_REJECTED: 
      return {
        ...state,
        error: {
          status: true,
          message: 'Error login'
        },
        loading: false
      }
    case SIGNUP_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    case LOGOUT_USER_FULFILLED: 
    return {
      ...state,
      loading: false,
      isLogin: false,
      id: '',
      email: '',
      error: {
        status: false,
        message: ''
      }
    }
    case LOGOUT_USER_REJECTED: 
      return {
        ...state,
        error: {
          status: true,
          message: 'Error login'
        },
        loading: false
      }
    case LOGOUT_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    default: 
      return state
  }
}

export default reducers