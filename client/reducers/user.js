import {
	REQUEST_CURRENTUSER,
	REQUEST_CURRENTUSER_SUCCESS,
	REQUEST_FAILD,
	REQUEST_SIGNUP_USER,
	REQUEST_SIGNUP_USER_SUCCESS,
	REQUEST_UPDATEUSER,
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
		case REQUEST_CURRENTUSER_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				displayName: action.user.displayName,
				role: action.user.role,
				uid: action.user.uid,
				username: action.user.username
			})
			break
		case REQUEST_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
			break
		case REQUEST_SIGNUP_USER:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
			break
		case REQUEST_SIGNUP_USER_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				displayName: action.displayName,
				username: action.username
			})
			break
		case REQUEST_UPDATEUSER:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
			break
		case REQUEST_UPDATEUSER_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				displayName: action.user.displayName,
				role: action.user.role,
				uid: action.user.uid,
				username: action.user.username
			})
		default:
			return state
	}
}