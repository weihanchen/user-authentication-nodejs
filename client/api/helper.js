export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		return response.json()
			.then(json => {
				const errorMsg = json.hasOwnProperty('message') ? json.message : response.statusText
				const error = new Error(errorMsg)
				throw error
			})
	}
}

export function parseJSON(response) {
	return response.text()
		.then((text) => {
			return text ? JSON.parse(text) : {}
		})

}