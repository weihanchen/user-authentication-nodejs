import {
	REQUEST_LOGIN,
	REQUEST_LOGIN_FAILD,
	REQUEST_LOGIN_SUCCESS
} from '../actions'

export default function login(state = {
	error: null,
	status: 'init',
	token: null
}, action) {
	switch (action.type) {
		case REQUEST_LOGIN:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
			break
		case REQUEST_LOGIN_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
			break
		case REQUEST_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				token: action.token
			})

			break
		default:
			return state
	}
}