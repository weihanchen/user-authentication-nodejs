import {
	REQUEST_CURRENTUSER,
	REQUEST_CURRENTUSER_FAILD,
	REQUEST_CURRENTUSER_SUCCESS,
	REQUEST_UPDATEUSER,
	REQUEST_UPDATEUSER_FAILD,
	REQUEST_UPDATEUSER_SUCCESS
} from '../actions'

export default function user(state = {
	error: null,
	status: 'init'
}, action) {
	switch (action.type) {
		case REQUEST_CURRENTUSER:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
			break
		case REQUEST_CURRENTUSER_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
			break
		case REQUEST_CURRENTUSER_SUCCESS:
			return Object.assign({}, state, {
				status: 'load_current_user_success',
				displayName: action.user.displayName,
				role: action.user.role,
				uid: action.user.uid,
				username: action.user.username
			})
			break
		case REQUEST_UPDATEUSER:
			return Object.assign({},state,{
				status: 'loading',
				error: null
			})
			break
		case REQUEST_UPDATEUSER_FAILD:
			return Object.assign({},state, {
				status: 'error',
				error: action.error
			})
			break
		case REQUEST_UPDATEUSER_SUCCESS:
			return Object.assign({},state, {
				status: 'update_user_success'
			})
		default:
			return state
	}
}