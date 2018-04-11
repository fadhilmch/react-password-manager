import { 
  FETCH_FILTERED_LIST_FULFILLED
} from '../passwords.actionTypes'

export const fetchFilteredList = (payload) => {
  return (dispatch, getState) => {
    console.log('payload', payload)
    let regexp = new RegExp(payload)
    let passwordsList = getState().passwords.passwordsList.concat()
    let filteredPassword = passwordsList.filter(val => {
      return regexp.test(val.title)
    })
    console.log('filtered list ', filteredPassword)
    dispatch(fetchFilteredListFulfilled(filteredPassword))
  }
}

const fetchFilteredListFulfilled = (payload) => ({
  type: FETCH_FILTERED_LIST_FULFILLED,
  payload
})