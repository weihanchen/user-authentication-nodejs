import {
	combineReducers
} from 'redux';
import login from './login'
import authentication from './authentication'

export default combineReducers({
	login,
	authentication
})