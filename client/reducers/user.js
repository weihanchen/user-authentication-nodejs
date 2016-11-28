import {
	REQUEST_CURRENTUSER,
	REQUEST_CURRENTUSER_FAILD,
	REQUEST_CURRENTUSER_SUCCESS
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
				statue: 'error',
				error: action.error
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
		default:
			return state
	}
}