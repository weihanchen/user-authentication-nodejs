import {
	combineReducers
} from 'redux'
import authentication from './authentication'
import login from './login'
import logout from './logout'
import user from './user'

export default combineReducers({
	authentication,
	login,
	logout,
	user
})