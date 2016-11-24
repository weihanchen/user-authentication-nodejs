import {
	checkStatus,
	parseJSON
} from './helper.js'

export default function requestLogin({
	username,
	password
}) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username
			password: password
		})
	}
	const url = 'http://localhost:3000/api/users/login'
	return fetch(url, options)
		.then(checkStatus)
		.then(parseJSON)
}