import {
  FETCH_PASSWORDS_LIST_FULFILLED,
  FETCH_PASSWORDS_LIST_REJECTED,
  FETCH_PASSWORDS_LIST_REQUESTED,
  FETCH_PASSWORD_BY_ID_FULFILLED,
  FETCH_PASSWORD_BY_ID_REJECTED,
  FETCH_PASSWORD_BY_ID_REQUESTED,
  ADD_NEW_PASSWORD_FULFILLED,
  ADD_NEW_PASSWORD_REJECTED,
  ADD_NEW_PASSWORD_REQUESTED,
  FETCH_FILTERED_LIST_FULFILLED,
  DELETE_PASSWORD_FULFILLED,
  DELETE_PASSWORD_REJECTED,
  DELETE_PASSWORD_REQUESTED,
  UPDATE_PASSWORD_FULFILLED,
  UPDATE_PASSWORDS_LIST_FULFILLED
} from '../passwords.actionTypes'

const initialState = {
  passwordsList: [],
  filteredList: [],
  loading: false,
  error: {
    status: false,
    message: ''
  },
  passwordData: {
    url: '',
    username: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date() 
  },
  search: '',
  editPassword: {
    url: '',
    username: '',
    password: '',
    updatedAt: new Date(),
    createdAt: new Date(),
    title: ''
  }
}

const reducers = (state = {...initialState}, action) => {
  switch(action.type) {
    case FETCH_PASSWORDS_LIST_FULFILLED: 
      return {
        ...state,
        passwordsList: action.payload,
        loading: false,
        error: {
          status: false,
          message: ''
        }
      }
    case FETCH_PASSWORDS_LIST_REJECTED: 
      return {
        ...state,
        error: {
          status: true,
          message: 'Error fetch data from database'
        },
        loading: false
      }
    case FETCH_PASSWORDS_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    case FETCH_PASSWORD_BY_ID_FULFILLED: 
      return {
        ...state,
        editPassword: action.payload,
        loading: false,
        error: {
          status: false,
          message: ''
        }
      }
    case FETCH_PASSWORD_BY_ID_REJECTED: 
      return {
        ...state,
        error: {
          status: true,
          message: 'Error fetch data from database'
        },
        loading: false
      }
    case FETCH_PASSWORD_BY_ID_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    case ADD_NEW_PASSWORD_REJECTED:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: 'Error add new password'
        }
      }
    case ADD_NEW_PASSWORD_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    case ADD_NEW_PASSWORD_FULFILLED:
      return {
        ...state,
        loading: false
      }
    case FETCH_FILTERED_LIST_FULFILLED:
      return {
        ...state, 
        filteredList: action.payload
      }
    case DELETE_PASSWORD_FULFILLED:
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: ''
        }
      }
    case DELETE_PASSWORD_REJECTED: 
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: 'Cannot delete password'
        }
      }
    case DELETE_PASSWORD_REQUESTED:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        }
      }
    // case UPDATE_PASSWORDS_LIST:
    //   return{}
    // case ADD_NEW_PASSWORD:
    //   return {}
    // case DELETE_PASSWORD:
    //   return {}
    // case UPDATE_PASSWORD:
    //   return {}
    default: 
      return state
  }
}

export default reducers