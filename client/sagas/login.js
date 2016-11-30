import {
	takeEvery
} from 'redux-saga'

import {
	put,
	call
} from 'redux-saga/effects'

import {
	REQUEST_LOGIN,
	REQUEST_LOGIN_FAILD,
	REQUEST_LOGIN_SUCCESS
} from '../actions'

import {
	AuthService
} from '../api'

export function* watchLogin() {
	yield call(takeEvery, REQUEST_LOGIN, loginFlow)
}

export function* loginFlow(action) {
	try {
		const authService = new AuthService()
		const userInfo = yield call(authService.requestLogin, action.username, action.password)
		const token = userInfo.token
		localStorage.setItem('token', token)
		yield put({
			type: REQUEST_LOGIN_SUCCESS,
			token
		})
	} catch (error) {
		yield put({
			type: REQUEST_LOGIN_FAILD,
			error
		})
	}
}