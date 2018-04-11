import { 
  LOGOUT_USER_FULFILLED,
  LOGOUT_USER_REJECTED,
  LOGOUT_USER_REQUESTED
} from '../users.actionTypes'


import {auth} from '../../../firebase'

export const logoutUser = (email, password) => {
  return dispatch => {
    dispatch(logoutUserRequested())

    auth.signOut()
      .then(res => {
        dispatch(logoutUserFulfilled())  
      })
      .catch((err) => {
        console.log('error ' + err)
        dispatch(logoutUserRejected())
      })
  }
}

const logoutUserRequested = () => ({
  type: LOGOUT_USER_REQUESTED
})

const logoutUserRejected = () => ({
  type: LOGOUT_USER_REJECTED
})

const logoutUserFulfilled = () => ({
  type: LOGOUT_USER_FULFILLED,
})