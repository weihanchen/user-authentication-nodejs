import {
	takeEvery
} from 'redux-saga'

import {
	put,
	call
} from 'redux-saga/effects'

import {
	REQUEST_AUTHENTICATION,
	REQUEST_AUTHENTICATION_FAILD,
	REQUEST_AUTHENTICATION_SUCCESS
} from '../actions'

import {
	AuthService
} from '../api'

export function* watchAuthentication() {
	yield call(takeEvery, REQUEST_AUTHENTICATION, authenticationFlow)
}

export function* authenticationFlow(action) {
	try {
		const authService = new AuthService()
		yield call(authService.requestAuth, action.token)
		yield put({
			type: REQUEST_AUTHENTICATION_SUCCESS
		})
	} catch (error) {
		yield put({
			type: REQUEST_AUTHENTICATION_FAILD,
			error
		})
	}
}