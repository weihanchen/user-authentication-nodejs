export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const REQUEST_LOGOUT_FAILD = 'REQUEST_LOGOUT_FAILD'
export const REQUEST_LOGOUT_SUCCESS = 'REQUEST_LOGOUT_SUCCESS'

export function requestLogout(token) {
	return {
		type: REQUEST_LOGOUT,
		token
	}
}

export function requestLogoutFaild() {
	return {
		type: REQUEST_LOGOUT_FAILD
	}
}

export function requestLogoutSuccess() {
	return {
		type: REQUEST_LOGOUT_SUCCESS
	}
}