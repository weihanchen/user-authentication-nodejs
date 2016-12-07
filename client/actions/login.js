export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGIN_FAILD = 'REQUEST_LOGIN_FAILD'
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS'
export const RESET_LOGIN_STATUS = 'RESET_LOGIN_STATUS'

export function requestLogin(username, password) {
	return {
		type: REQUEST_LOGIN,
		username,
		password
	}
}

export function requestLoginFaild() {
	return {
		type: REQUEST_LOGIN_FAILD
	}
}

export function requestLoginSuccess() {
	return {
		type: REQUEST_LOGIN_SUCCESS
	}
}

export function resetLoginStatus() {
	return {
		type: RESET_LOGIN_STATUS
	}
}