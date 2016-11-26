import {
	checkStatus,
	parseJSON
} from './helper.js'

import {
	LOGIN_URL
} from '../config'

export default class AuthService {
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
}