import {
	checkStatus,
	parseJSON
} from './helper.js'

import {
	LOGIN_URL
} from '../config'

export default class AuthService {
	requestLogin(username, password) {
		const headers = new Headers()
		headers.set('Content-Type', 'application/json')
		const options = {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}
		return fetch(LOGIN_URL, options)
			.then(checkStatus)
			.then(parseJSON)
	}
}