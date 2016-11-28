import {
	combineReducers
} from 'redux'
import authentication from './authentication'
import login from './login'
import user from './user'

export default combineReducers({
	authentication,
	login,
	user
})