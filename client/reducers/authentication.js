import {
	REQUEST_AUTHENTICATION,
	REQUEST_AUTHENTICATION_FAILD,
	REQUEST_AUTHENTICATION_SUCCESS
} from '../actions'

export default function authentication(state = {
	error: null,
	status: 'init'
}, action) {
	switch (action.type) {
		case REQUEST_AUTHENTICATION:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
			break
		case REQUEST_AUTHENTICATION_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
			break
		case REQUEST_AUTHENTICATION_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				user: action.user
			})

			break
		default:
			return state
	}
}