import {
	REQUEST_LOGOUT,
	REQUEST_LOGOUT_FAILD,
	REQUEST_LOGOUT_SUCCESS
} from '../actions'

export default function logout(state = {
	error: null,
	status: 'init'
}, action) {
	switch (action.type) {
		case REQUEST_LOGOUT:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
			break
		case REQUEST_LOGOUT_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
			break
		case REQUEST_LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				status: 'success'
			})

			break
		default:
			return state
	}
}