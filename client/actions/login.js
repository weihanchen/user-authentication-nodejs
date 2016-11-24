export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGIN_FAILD = 'REQUEST_LOGIN_FAILD'
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS'

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