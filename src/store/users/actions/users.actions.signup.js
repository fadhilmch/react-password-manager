import { 
  SIGNUP_USER_FULFILLED,
  SIGNUP_USER_REJECTED,
  SIGNUP_USER_REQUESTED
} from '../users.actionTypes'


import {auth} from '../../../firebase'

export const signupUser = (email, password) => {
  return dispatch => {
    dispatch(signupUserRequested())

    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('auth res', res)
        // let newKey = password_manager.push().key
        console.log('created')
        password_manager.child(res.uid).update({
          email: email
        })
          .then(() => {
            dispatch(addNewPasswordFulfilled(res.uid, email))
            return 0
          })
          .catch((err) => {
            console.log('error ' + err)
            dispatch(addNewPasswordRejected())
          })
      })
      .catch((err) => {
        console.log('error ' + err)
        dispatch(signupUserRejected())
      })
  }
}

const signupUserRequested = () => ({
  type: SIGNUP_USER_REQUESTED
})

const signupUserRejected = () => ({
  type: SIGNUP_USER_REJECTED
})

const signupUserFulfilled = (id, email) => ({
  type: SIGNUP_USER_FULFILLED,
  payload: {
    id,
    email
  }
})