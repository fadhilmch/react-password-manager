import { combineReducers } from 'redux'
import passwordsListReducers from './passwords/reducers/passwords.reducers.passwords_list'
import usersReducers from './users/reducers/users.reducers.users'


const reducers = combineReducers({
  passwords: passwordsListReducers,
  users: usersReducers
})

export default reducers