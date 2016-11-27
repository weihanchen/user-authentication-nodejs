export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
export const REQUEST_AUTHENTICATION_FAILD = 'REQUEST_AUTHENTICATION_FAILD'
export const REQUEST_AUTHENTICATION_SUCCESS = 'REQUEST_AUTHENTICATION_SUCCESS'

export function requestAuthentication(token) {
	return {
		type: REQUEST_AUTHENTICATION,
		token
	}
}

export function requestAuthenticationFaild() {
	return {
		type: REQUEST_AUTHENTICATION_FAILD
	}
}

export function requestAuthenticationSuccess() {
	return {
		type: REQUEST_AUTHENTICATION_SUCCESS
	}
}