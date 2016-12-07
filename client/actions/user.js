export const REQUEST_CURRENTUSER = 'REQUEST_CURRENTUSER'
export const REQUEST_CURRENTUSER_SUCCESS = 'REQUEST_CURRENTUSER_SUCCESS'
export const REQUEST_FAILD = 'REQUEST_FAILD'
export const REQUEST_SIGNUP_USER = 'REQUEST_SIGNUP_USER'
export const REQUEST_SIGNUP_USER_SUCCESS = 'REQUEST_SIGNUP_USER_SUCCESS'
export const REQUEST_UPDATEUSER = 'REQUEST_UPDATEUSER'
export const REQUEST_UPDATEUSER_SUCCESS = 'REQUEST_UPDATEUSER_SUCCESS'
export const RESET_USER_STATUS = 'RESET_USER_STATUS'

export function requestCurrentUser(token) {
	return {
		type: REQUEST_CURRENTUSER,
		token
	}
}

export function requestSignupUser(displayName, password, username) {
	return {
		type: REQUEST_SIGNUP_USER,
		displayName,
		password,
		username
	}
}

export function requestUpdateUser(token, user) {
	return {
		type: REQUEST_UPDATEUSER,
		token,
		user
	}
}

export function resetUserStatus() {
	return {
		type: RESET_USER_STATUS
	}
}