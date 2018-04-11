import { 
  DELETE_PASSWORD_FULFILLED,
  DELETE_PASSWORD_REJECTED,
  DELETE_PASSWORD_REQUESTED
} from '../passwords.actionTypes'


import {password_manager} from '../../../firebase'

export const deletePassword = (payload) => {
  return (dispatch, getState) => {
    dispatch(deletePasswordRequested())
    console.log('delete ', payload)
    return password_manager.child(getState().users.id).child(payload).remove()
  }
}

const deletePasswordRequested = () => ({
  type: DELETE_PASSWORD_REQUESTED
})

export const deletePasswordRejected = () => ({
  type: DELETE_PASSWORD_REJECTED
})

export const deletePasswordFulfilled = () => ({
  type: DELETE_PASSWORD_FULFILLED
})