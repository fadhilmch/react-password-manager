import { 
  FETCH_PASSWORD_BY_ID_FULFILLED,
  FETCH_PASSWORD_BY_ID_REJECTED,
  FETCH_PASSWORD_BY_ID_REQUESTED,
} from '../passwords.actionTypes'

import {password_manager} from '../../../firebase'

export const fetchPasswordById = (payload) => {
  return (dispatch, getState) => {
    dispatch(fetchPasswordByIdRequested())
    return password_manager.child(getState().users.id).child(payload).once('value')
  }
}

export const fetchPasswordByIdFulfilled = (payload) => ({
  type: FETCH_PASSWORD_BY_ID_FULFILLED,
  payload
})

export const fetchPasswordByIdRejected = () => ({
  type: FETCH_PASSWORD_BY_ID_REJECTED,
})

export const fetchPasswordByIdRequested = () => ({
  type: FETCH_PASSWORD_BY_ID_REQUESTED
})