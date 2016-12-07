import {
	takeEvery
} from 'redux-saga'

import {
	put,
	call
} from 'redux-saga/effects'

import {
	REQUEST_LOGOUT,
	REQUEST_LOGOUT_FAILD,
	REQUEST_LOGOUT_SUCCESS
} from '../actions'

import {
	AuthService
} from '../api'

export function* watchLogout() {
	yield call(takeEvery, REQUEST_LOGOUT, logoutFlow)
}

export function* logoutFlow(action) {
	try {
		const authService = new AuthService()
		yield call(authService.requestLogout, action.token)
		localStorage.removeItem('token')
		yield put({
			type: REQUEST_LOGOUT_SUCCESS
		})
	} catch (error) {
		yield put({
			type: REQUEST_LOGOUT_FAILD,
			error
		})
	}
}