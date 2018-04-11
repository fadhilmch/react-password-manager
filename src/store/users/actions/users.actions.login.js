import { 
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REJECTED,
  LOGIN_USER_REQUESTED
} from '../users.actionTypes'


import {auth} from '../../../firebase'

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(loginUserRequested())

    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(loginUserFulfilled(res.uid, email))  
      })
      .catch((err) => {
        console.log('error ' + err)
        dispatch(loginUserRejected())
      })
  }
}

export const onChangeState = () => {
  return dispatch => {
    auth.onAuthStateChanged( user => {
      if (user) {
        dispatch(loginUserFulfilled(user.uid, user.email))
      }
    })
  }
}

const loginUserRequested = () => ({
  type: LOGIN_USER_REQUESTED
})

const loginUserRejected = () => ({
  type: LOGIN_USER_REJECTED
})

const loginUserFulfilled = (id, email) => ({
  type: LOGIN_USER_FULFILLED,
  payload: {
    id, 
    email
  }
})