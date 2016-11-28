import {
	checkStatus,
	parseJSON
} from './helper.js'

import {
	CURRENT_USER_URL
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
}