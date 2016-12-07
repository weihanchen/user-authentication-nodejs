import {
	checkStatus,
	parseJSON
} from './helper.js'

import {
	CURRENT_USER_URL,
	LOGIN_URL,
	LOGOUT_URL
} from '../config'

export default class AuthService {
	requestAuth(token) {
		const options = {
			method: 'HEAD',
			headers: new Headers({
				'Authorization': token
			}),
			mode: 'cors'
		}
		return fetch(CURRENT_USER_URL, options)
			.then(checkStatus)
			.then(parseJSON)
	}

	requestLogin(username, password) {
		const options = {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			mode: 'cors',
			body: JSON.stringify({
				username: username,
				password: password
			})
		}
		return fetch(LOGIN_URL, options)
			.then(checkStatus)
			.then(parseJSON)
	}

	requestLogout(token) {
		const options = {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': token
			}),
			mode: 'cors'
		}
		return fetch(LOGOUT_URL, options)
			.then(checkStatus)
			.then(parseJSON)
	}
}