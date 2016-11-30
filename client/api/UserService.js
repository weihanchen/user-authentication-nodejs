import {
	checkStatus,
	parseJSON
} from './helper.js'

import {
	CURRENT_USER_URL,
	USERS_URL
} from '../config'

export default class UserService {
	requestCurrentUser(token) {
		const options = {
			method: 'GET',
			headers: new Headers({
				'Authorization': token
			}),
			mode: 'cors'
		}
		return fetch(CURRENT_USER_URL, options)
			.then(checkStatus)
			.then(parseJSON)
	}

	requestSignupUser(displayName, password, username) {
		const options = {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			mode: 'cors',
			body: JSON.stringify({
				displayName: displayName,
				password: password,
				username: username
			})
		}
		return fetch(USERS_URL, options)
			.then(checkStatus)
			.then(parseJSON)


	}

	requestUpdateUser(token, user) {
		const options = {
			method: 'PUT',
			headers: new Headers({
				'Authorization': token
			}),
			body: JSON.stringify(user),
			mode: 'cors'
		}
		return fetch(`${USERS_URL}/${user.uid}`, options)
			.then(checkStatus)
			.then(parseJSON)
	}
}