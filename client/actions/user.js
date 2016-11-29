export const REQUEST_CURRENTUSER = 'REQUEST_CURRENTUSER'
export const REQUEST_CURRENTUSER_FAILD = 'REQUEST_CURRENTUSER_FAILD'
export const REQUEST_CURRENTUSER_SUCCESS = 'REQUEST_CURRENTUSER_SUCCESS'
export const REQUEST_UPDATEUSER = 'REQUEST_UPDATEUSER'
export const REQUEST_UPDATEUSER_FAILD = 'REQUEST_UPDATEUSER_FAILD'
export const REQUEST_UPDATEUSER_SUCCESS = 'REQUEST_UPDATEUSER_SUCCESS'

export function requestCurrentUser(token) {
	return {
		type: REQUEST_CURRENTUSER,
		token
	}
}

export function requestUpdateUser(token,displayName,role,uid,username) {
	return {
		type: REQUEST_UPDATEUSER,
		token,
		displayName,
		role,
		uid,
		username
	}
}