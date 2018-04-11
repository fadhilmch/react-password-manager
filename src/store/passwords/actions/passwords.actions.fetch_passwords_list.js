import { 
  FETCH_PASSWORDS_LIST_FULFILLED,
  FETCH_PASSWORDS_LIST_REJECTED,
  FETCH_PASSWORDS_LIST_REQUESTED,
  FETCH_FILTERED_LIST_FULFILLED
} from '../passwords.actionTypes'

import {password_manager} from '../../../firebase'

export const fetchPasswordList = () => {
  return (dispatch, getState) => {
    console.log('fetch pass list')
    dispatch(fetchPasswordListRequested())
    password_manager.child(getState().users.id).once('value')
      .then(snapshot => {
        let allPasswords = []
        snapshot.forEach(snapshotChild => {
          let { title, password, updatedAt, url, createdAt, username } = snapshotChild.val()
          let id = snapshotChild.key
          let showStatus = false
          let tempPassword = {
            id,
            title,
            password,
            url,
            username,
            updatedAt,
            createdAt,
            showStatus
          }
          allPasswords.push(tempPassword)
        })
        dispatch(fetchPasswordListFulfilled(allPasswords))
        dispatch(fetchFilteredListFulfilled(allPasswords))

      })
      .catch(err => {
        dispatch(fetchPasswordListRejected())
      })
  }
}



const fetchFilteredListFulfilled = (payload) => ({
  type: FETCH_FILTERED_LIST_FULFILLED,
  payload
})

const fetchPasswordListFulfilled = (payload) => ({
  type: FETCH_PASSWORDS_LIST_FULFILLED,
  payload
})

const fetchPasswordListRejected = () => ({
  type: FETCH_PASSWORDS_LIST_REJECTED,
})

const fetchPasswordListRequested = () => ({
  type: FETCH_PASSWORDS_LIST_REQUESTED
})