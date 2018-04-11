import { 
  ADD_NEW_PASSWORD_FULFILLED,
  ADD_NEW_PASSWORD_REJECTED,
  ADD_NEW_PASSWORD_REQUESTED,
  UPDATE_PASSWORD_FULFILLED
} from '../passwords.actionTypes'


import {password_manager} from '../../../firebase'

export const addNewPassword = (payload) => {
  return (dispatch, getState) => {
    dispatch(addNewPasswordRequested())
    console.log('masuk')
    let newKey = password_manager.child(getState().users.id).push().key
    console.log('id', getState().users.id)
    console.log('newkey', newKey)
    console.log(payload)
    password_manager.child(getState().users.id).child(newKey).update(payload)
      .then(() => {
        console.log('success')
        dispatch(addNewPasswordFulfilled())
        return 0
      })
      .catch((err) => {
        console.log('error ' + err)
        dispatch(addNewPasswordRejected())
      })
  }
}

export const saveEditPassword = (payload, id) => {
  return (dispatch, getState) => {
    // dispatch(addNewPasswordRequested())
    password_manager.child(getState().users.id).child(id).update(payload)
      .then(() => {
        console.log('success')
        // dispatch(addNewPasswordFulfilled())
        return 0
      })
      .catch((err) => {
        console.log('error ' + err)
        // dispatch(addNewPasswordRejected())
      })
  }
}

// export const changeShowStatus = (payload) => {
//  type: UPDATE_PASSWORD_FULFILLED,
//  payload
// }

const addNewPasswordRequested = () => ({
  type: ADD_NEW_PASSWORD_REQUESTED
})

const addNewPasswordRejected = () => ({
  type: ADD_NEW_PASSWORD_REJECTED
})

const addNewPasswordFulfilled = () => ({
  type: ADD_NEW_PASSWORD_FULFILLED
})